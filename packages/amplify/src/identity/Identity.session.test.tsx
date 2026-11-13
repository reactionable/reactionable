import {
	i18nTestInstance,
	UIContextProvider,
	useUIProviderProps,
} from "@reactionable/core";
import {
	act,
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from "@testing-library/react";
import { getCurrentUser } from "aws-amplify/auth";
import {
	IdentityContextProvider,
	useIdentityContext,
	useIdentityProviderProps,
} from "./Identity";

vi.mock("aws-amplify/auth", () => ({
	getCurrentUser: vi.fn(),
	signIn: vi.fn(),
	signOut: vi.fn(),
	fetchAuthSession: vi.fn().mockResolvedValue({}),
}));

vi.mock("@aws-amplify/ui-react", async () => {
	const { useState } = await import("react");
	return {
		Authenticator: ({
			children,
		}: {
			children: (props: {
				user: { userId: string; username: string };
			}) => React.ReactNode;
		}) => {
			const [signedIn, setSignedIn] = useState(false);
			return signedIn ? (
				children({ user: { userId: "user-1", username: "Teacher" } })
			) : (
				<button onClick={() => setSignedIn(true)}>Sign in</button>
			);
		},
	};
});

function IdentityState() {
	const { user, displayName, AuthComponent } = useIdentityContext();
	return (
		<>
			{" "}
			<output aria-label="Identity">
				{user === undefined
					? "Loading"
					: user === null
						? "Anonymous"
						: displayName()}
			</output>
			{user === null && <AuthComponent />}
		</>
	);
}
function renderIdentity() {
	return render(
		<UIContextProvider {...useUIProviderProps()}>
			<IdentityContextProvider>
				<IdentityState />
			</IdentityContextProvider>
		</UIContextProvider>,
	);
}

describe("Amplify session", () => {
	beforeAll(i18nTestInstance);
	afterEach(() => vi.resetAllMocks());

	it("exposes an existing user-pool session without requiring an identity pool", async () => {
		vi.mocked(getCurrentUser).mockResolvedValue({
			userId: "user-1",
			username: "Teacher",
		});
		renderIdentity();
		expect(await screen.findByText("Teacher")).toBeInTheDocument();
	});

	it("settles to anonymous when no user is signed in", async () => {
		vi.mocked(getCurrentUser).mockRejectedValue(
			Object.assign(new Error("User needs to be authenticated"), {
				name: "UserUnAuthenticatedException",
			}),
		);
		renderIdentity();
		expect(await screen.findByText("Anonymous")).toBeInTheDocument();
	});

	it("keeps the identity pending until session discovery finishes", async () => {
		let resolveUser!: (
			value: Awaited<ReturnType<typeof getCurrentUser>>,
		) => void;
		vi.mocked(getCurrentUser).mockImplementation(
			() =>
				new Promise((resolve) => {
					resolveUser = resolve;
				}),
		);
		renderIdentity();
		expect(screen.getByLabelText("Identity")).toHaveTextContent("Loading");
		await waitFor(() => expect(getCurrentUser).toHaveBeenCalled());
		await act(async () =>
			resolveUser({ userId: "user-1", username: "Teacher" }),
		);
		expect(screen.getByLabelText("Identity")).toHaveTextContent("Teacher");
	});
	it("updates the identity after the Authenticator completes sign-in", async () => {
		vi.mocked(getCurrentUser).mockRejectedValue(
			Object.assign(new Error("Not signed in"), {
				name: "UserUnAuthenticatedException",
			}),
		);
		renderIdentity();
		fireEvent.click(await screen.findByRole("button", { name: "Sign in" }));
		expect(await screen.findByText("Teacher")).toBeInTheDocument();
	});

	it("preserves unexpected session errors for the caller", async () => {
		const error = new Error("Invalid authentication configuration");
		vi.mocked(getCurrentUser).mockRejectedValue(error);
		const { result } = renderHook(() =>
			useIdentityProviderProps().useFetchUser(),
		);
		await waitFor(() => expect(result.current.loading).toBe(false));
		expect(result.current.error).toBe(error);
	});
});
