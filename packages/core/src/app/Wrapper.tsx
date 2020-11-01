import React, { PropsWithChildren, StrictMode } from 'react';

import { IIdentityProviderProps, IdentityContextProvider } from '../identity/Identity';
import { IRouterProviderProps, RouterContextProvider } from '../router/Router';
import { IUIContextProviderProps, UIContextProvider } from '../ui/UI';

export interface IWrapperProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIContextProviderProps,
  RouterProviderProps extends IRouterProviderProps
> {
  identity?: IdentityProviderProps;
  ui?: UIProviderProps;
  router?: RouterProviderProps;
}

export function Wrapper<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIContextProviderProps = IUIContextProviderProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>({
  children,
  identity,
  ui,
  router,
}: PropsWithChildren<IWrapperProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>>) {
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
