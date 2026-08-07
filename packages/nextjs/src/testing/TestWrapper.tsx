import {
	TestWrapper as CoreTestWrapper,
	type IAppProps,
	type IRouterProviderProps as ICoreRouterProviderProps,
	type IIdentityProviderProps,
	type IUIProviderProps,
} from "@reactionable/core";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import type { NEXT_DATA } from "next/dist/shared/lib/utils";
import type { PropsWithChildren, ReactElement } from "react";
import type { IRouterProviderProps } from "../router/useRouterContext";
import { useRouterProviderProps } from "../router/useRouterProviderProps";
import mockNextRouter from "./mockNextRouter";

declare global {
	interface Window {
		/* prod */
		__NEXT_DATA__: NEXT_DATA;
	}
}

function RouterComponent({
	children,
}: PropsWithChildren<Partial<IRouterProviderProps>>): ReactElement {
	window.__NEXT_DATA__ = {
		props: {},
		page: "",
		query: {},
		buildId: ",",
	};
	const router = mockNextRouter({ pathname: "/", asPath: "/" });
	return (
		<RouterContext.Provider value={router}>{children}</RouterContext.Provider>
	);
}

export type ITestWrapperProps<
	IdentityProviderProps extends IIdentityProviderProps,
	UIProviderProps extends IUIProviderProps,
	RouterProviderProps extends ICoreRouterProviderProps,
> = IAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>;

export function TestWrapper<
	IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
	UIProviderProps extends IUIProviderProps = IUIProviderProps,
	RouterProviderProps extends
		ICoreRouterProviderProps = ICoreRouterProviderProps,
>({
	router,
	...props
}: ITestWrapperProps<
	IdentityProviderProps,
	UIProviderProps,
	RouterProviderProps
>): ReactElement {
	return (
		<CoreTestWrapper<
			IdentityProviderProps,
			UIProviderProps,
			RouterProviderProps
		>
			{...props}
			router={
				useRouterProviderProps({
					...(router as Partial<IRouterProviderProps>),
					Component: RouterComponent,
				}) as unknown as RouterProviderProps
			}
		/>
	);
}
