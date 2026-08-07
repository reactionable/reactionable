import type {
	IAppProps as ICoreAppProps,
	IIdentityProviderProps,
	IRouterProviderProps,
} from "@reactionable/core";

import type { IUIProviderProps } from "../UI";

export type IAppProps<
	IdentityProviderProps extends IIdentityProviderProps,
	UIProviderProps extends IUIProviderProps = IUIProviderProps,
	RouterProviderProp extends IRouterProviderProps = IRouterProviderProps,
> = ICoreAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProp>;
