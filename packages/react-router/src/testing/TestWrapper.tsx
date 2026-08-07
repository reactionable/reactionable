import {
	TestWrapper as CoreTestWrapper,
	type IRouterProviderProps as ICoreRouterProviderProps,
	type IIdentityProviderProps,
	type ITestWrapperProps,
	type IUIProviderProps,
} from "@reactionable/core";
import type { ReactElement } from "react";
import { MemoryRouterComponent } from "../router/MemoryRouterComponent";
import {
	type IRouterProviderProps as IReactRouterProviderProps,
	useRouterProviderProps,
} from "../router/useRouterProviderProps";

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
					...(router as Partial<IReactRouterProviderProps>),
					Component: MemoryRouterComponent,
				}) as unknown as RouterProviderProps
			}
		/>
	);
}
