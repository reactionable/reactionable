import {
  IAppProps as ICoreAppProps,
  IIdentityProviderProps,
  IRouterProviderProps,
} from "@reactionable/core";

import { IUIProviderProps } from "../UI";

export type IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProp extends IRouterProviderProps = IRouterProviderProps,
> = ICoreAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProp>;
