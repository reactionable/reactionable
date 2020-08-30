import React, { Component, PropsWithChildren, StrictMode } from 'react';

import { IIdentityContextProviderProps, IdentityContextProvider } from '../identity/Identity';
import { IUIContextProviderProps, UIContextProvider } from '../ui/UI';

export interface IWrapperProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps
> {
  RouterComponent: typeof Component;
  identity?: ICP;
  ui?: UICP;
}

export function Wrapper<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps
>({ RouterComponent, children, identity, ui }: PropsWithChildren<IWrapperProps<ICP, UICP>>) {
  let wrapped = <RouterComponent children={children} />;

  if (identity) {
    wrapped = <IdentityContextProvider {...identity}>{wrapped}</IdentityContextProvider>;
  }

  wrapped = <UIContextProvider {...ui}>{wrapped}</UIContextProvider>;

  return <StrictMode>{wrapped}</StrictMode>;
}
