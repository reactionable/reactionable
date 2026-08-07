import {
	TestWrapper as CoreTestWrapper,
	type IIdentityProviderProps,
	type IRouterProviderProps,
	type ITestWrapperProps,
} from "@reactionable/core";
import type { ReactElement } from "react";

import { type IUIProviderProps, useUIProviderProps } from "../UI";

export function TestWrapper<
	IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
	UIProviderProps extends IUIProviderProps = IUIProviderProps,
	RouterProviderProps extends IRouterProviderProps = IRouterProviderProps,
>({
	ui,
	...props
}: ITestWrapperProps<
	IdentityProviderProps,
	UIProviderProps,
	RouterProviderProps
>): ReactElement {
	return <CoreTestWrapper ui={useUIProviderProps(ui)} {...props} />;
}
