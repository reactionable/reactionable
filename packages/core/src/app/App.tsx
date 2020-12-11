import { PropsWithChildren, ReactElement, StrictMode } from "react";

import { IIdentityProviderProps, IdentityContextProvider } from "../identity/Identity";
import { IRouterProviderProps, RouterContextProvider } from "../router/Router";
import { IUIProviderProps, UIContextProvider } from "../ui/UI";

export interface IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps
> {
  identity?: IdentityProviderProps;
  ui?: UIProviderProps;
  router?: RouterProviderProps;
}

export function App<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>({
  identity,
  ui,
  router,
  children,
}: PropsWithChildren<
  IAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
>): ReactElement {
  if (router) {
    children = <RouterContextProvider {...router}>{children}</RouterContextProvider>;
  }

  if (identity) {
    children = <IdentityContextProvider {...identity}>{children}</IdentityContextProvider>;
  }

  if (ui) {
    children = <UIContextProvider {...ui}>{children}</UIContextProvider>;
  }

  return <StrictMode>{children}</StrictMode>;
}
