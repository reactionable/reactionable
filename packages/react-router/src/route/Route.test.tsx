import {
	Crud,
	IdentityContext,
	i18nTestInstance,
	Link,
	RouterContext,
	UIContextProvider,
	useIdentityProviderProps,
	useRouterContext,
	useUIProviderProps,
} from "@reactionable/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { lazy } from "react";
import { type InitialEntry, MemoryRouter } from "react-router";
import { useRouteMatch } from "../router/useRouteMatch";
import { useRouterProviderProps } from "../router/useRouterProviderProps";
import { type IRouteProps, renderRoutes } from "./Route";

const Home = lazy(async () => ({ default: () => <h1>Home</h1> }));
const NotFound = lazy(async () => ({ default: () => <h1>Not found</h1> }));
const Detail = lazy(async () => ({
	default: function Detail() {
		const match = useRouteMatch<{ itemId: string }>();
		return (
			<>
				<h1>Item {match.params.itemId}</h1>
				<output aria-label="Resolved path">{match.path}</output>
			</>
		);
	},
}));
const List = lazy(async () => ({
	default: function List() {
		const { useRouter } = useRouterContext();
		const { push } = useRouter();
		return (
			<>
				<button onClick={() => push("/items/42")}>Open item 42</button>
				<Link href="/items/42">Item detail</Link>
				<Link href="https://example.com/help">Help</Link>
			</>
		);
	},
}));
const Notes = lazy(async () => ({
	default: () => (
		<Crud name="Item" listComponent={List} readComponent={Detail} />
	),
}));
const childRoutes = [{ path: "notes/*", component: Notes }];
const Items = lazy(async () => ({
	default: () => (
		<Crud
			name="Item"
			listComponent={List}
			readComponent={Detail}
			routes={childRoutes}
		/>
	),
}));

const routes: IRouteProps[] = [
	{ index: true, component: Home },
	{ path: "items/*", component: Items, privateRoute: true },
	{ component: NotFound },
];

function renderAt(
	path: InitialEntry,
	{ user }: { user?: object | null } = { user: {} },
) {
	return render(
		<UIContextProvider {...useUIProviderProps()}>
			<IdentityContext.Provider
				value={{
					...useIdentityProviderProps(),
					user,
					setUser: () => {},
					displayName: () => "User",
				}}
			>
				<RouterContext.Provider value={useRouterProviderProps()}>
					<MemoryRouter initialEntries={[path]}>
						{renderRoutes(routes)}
					</MemoryRouter>
				</RouterContext.Provider>
			</IdentityContext.Provider>
		</UIContextProvider>,
	);
}

describe("declarative routes", () => {
	beforeAll(i18nTestInstance);

	it("renders the index route", async () => {
		renderAt("/");
		expect(
			await screen.findByRole("heading", { name: "Home" }),
		).toBeInTheDocument();
	});

	it("navigates from the CRUD list to an item using the router context", async () => {
		renderAt("/items");
		fireEvent.click(
			await screen.findByRole("button", { name: "Open item 42" }),
		);
		expect(
			await screen.findByRole("heading", { name: "Item 42" }),
		).toBeInTheDocument();
		expect(screen.getByLabelText("Resolved path")).toHaveTextContent(
			"/items/42",
		);
	});

	it("opens a CRUD item directly", async () => {
		renderAt("/items/42");
		expect(
			await screen.findByRole("heading", { name: "Item 42" }),
		).toBeInTheDocument();
	});

	it("redirects an anonymous visitor away from a private route", async () => {
		renderAt("/items/42", { user: null });
		expect(
			await screen.findByRole("heading", { name: "Home" }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: "Item 42" }),
		).not.toBeInTheDocument();
	});

	it("keeps private content hidden while identity is loading", () => {
		renderAt("/items/42", { user: undefined });
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
	});

	it("renders the fallback for an unknown URL", async () => {
		renderAt("/missing");
		expect(
			await screen.findByRole("heading", { name: "Not found" }),
		).toBeInTheDocument();
	});
	it("matches nested CRUD routes after rerendering without rewriting their paths", async () => {
		const result = renderAt("/items/42/notes/7");
		expect(
			await screen.findByRole("heading", { name: "Item 7" }),
		).toBeInTheDocument();
		result.unmount();
		renderAt("/items/42/notes/8");
		expect(
			await screen.findByRole("heading", { name: "Item 8" }),
		).toBeInTheDocument();
	});

	it("renders the fallback when an existing route reports missing data", async () => {
		renderAt({
			pathname: "/items/42",
			state: { notFoundError: "Item is missing" },
		});
		expect(
			await screen.findByRole("heading", { name: "Not found" }),
		).toBeInTheDocument();
	});
	it("navigates using the href supplied by a core Link", async () => {
		renderAt("/items");
		fireEvent.click(await screen.findByRole("link", { name: "Item detail" }));
		expect(
			await screen.findByRole("heading", { name: "Item 42" }),
		).toBeInTheDocument();
	});
	it("keeps absolute URLs intact for external links", async () => {
		renderAt("/items");
		expect(await screen.findByRole("link", { name: "Help" })).toHaveAttribute(
			"href",
			"https://example.com/help",
		);
	});
});
