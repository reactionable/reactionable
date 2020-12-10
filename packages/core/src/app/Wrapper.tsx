import { PropsWithChildren, ReactElement, StrictMode } from "react";

import { IIdentityProviderProps, IdentityContextProvider } from "../identity/Identity";
import { IRouterProviderProps, RouterContextProvider } from "../router/Router";
import { IUIProviderProps, UIContextProvider } from "../ui/UI";

export interface IWrapperProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps
> {
  identity?: IdentityProviderProps;
  ui?: UIProviderProps;
  router?: RouterProviderProps;
}

export function Wrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>({
  children,
  identity,
  ui,
  router,
}: PropsWithChildren<
  IWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
>): ReactElement {
  let wrapped = children;

  if (router) {
    wrapped = <RouterContextProvider {...router}>{wrapped}</RouterContextProvider>;
  }

  if (identity) {
    wrapped = <IdentityContextProvider {...identity}>{wrapped}</IdentityContextProvider>;
  }

  if (ui) {
    wrapped = <UIContextProvider {...ui}>{wrapped}</UIContextProvider>;
  }

  return <StrictMode>{wrapped}</StrictMode>;
}
