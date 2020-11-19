import { IAppProps as ICoreAppProps } from "@reactionable/core/lib/app/App";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { IRouterProviderProps } from "@reactionable/core/lib/router/Router";

import { IUIProviderProps } from "../UI";

export type IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProp extends IRouterProviderProps = IRouterProviderProps
> = ICoreAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProp>;
