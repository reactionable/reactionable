import { IAppProps as ICoreAppProps } from "@reactionable/core/lib/app/App";
import { IIdentityProviderProps } from "@reactionable/core/lib/identity/Identity";
import { IUIProviderProps } from "@reactionable/core/lib/ui/UI";

import { IRouterProviderProps } from "../router/Router";

export type IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps
> = ICoreAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>;
