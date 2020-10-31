import React, { PropsWithChildren, StrictMode } from 'react';

import { IIdentityContextProviderProps, IdentityContextProvider } from '../identity/Identity';
import { IRouterContextProviderProps, RouterContextProvider } from '../router/Router';
import { IUIContextProviderProps, UIContextProvider } from '../ui/UI';

export interface IWrapperProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps,
  RCP extends IRouterContextProviderProps
> {
  identity?: ICP;
  ui?: UICP;
  router?: RCP;
}

export function Wrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  RCP extends IRouterContextProviderProps = IRouterContextProviderProps
>({ children, identity, ui, router }: PropsWithChildren<IWrapperProps<ICP, UICP, RCP>>) {
  let wrapped = children;

  if (router) {
    wrapped = <RouterContextProvider {...router}>{wrapped}</RouterContextProvider>;
  }

  if (identity) {
    wrapped = <IdentityContextProvider {...identity}>{wrapped}</IdentityContextProvider>;
  }

  wrapped = <UIContextProvider {...ui}>{wrapped}</UIContextProvider>;

  return <StrictMode>{wrapped}</StrictMode>;
}
