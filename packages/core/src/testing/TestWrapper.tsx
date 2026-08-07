import type { PropsWithChildren, ReactElement } from "react";

import { App } from "../app/App";
import {
	type IIdentityProviderProps,
	useIdentityProviderProps,
} from "../identity/Identity";
import {
	type IRouterProviderProps,
	useRouterProviderProps,
} from "../router/useRouterProviderProps";
import { type IUIProviderProps, useUIProviderProps } from "../ui/UI";

export type ITestWrapperProps<
	IdentityProviderProps extends IIdentityProviderProps,
	UIProviderProps extends IUIProviderProps,
	RouterProviderProps extends IRouterProviderProps,
> = PropsWithChildren<{
	identity?: Partial<IdentityProviderProps>;
	ui?: Partial<UIProviderProps>;
	router?: Partial<RouterProviderProps>;
}>;

export function TestWrapper<
	IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
	UIProviderProps extends IUIProviderProps = IUIProviderProps,
	RouterProviderProps extends IRouterProviderProps = IRouterProviderProps,
>({
	ui,
	router,
	identity,
	...props
}: ITestWrapperProps<
	IdentityProviderProps,
	UIProviderProps,
	RouterProviderProps
>): ReactElement {
	return (
		<App<IdentityProviderProps, UIProviderProps, RouterProviderProps>
			identity={useIdentityProviderProps(identity) as IdentityProviderProps}
			router={useRouterProviderProps(router) as RouterProviderProps}
			ui={useUIProviderProps(ui) as UIProviderProps}
			{...props}
		/>
	);
}
