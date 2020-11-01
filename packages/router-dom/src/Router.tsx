import { IRenderRoutes } from '@reactionable/core/lib/router/Route';
import {
  RouterContextProvider as CoreRouterContextProvider,
  IRouterProviderProps as ICoreRouterProviderProps,
  useRouterProviderProps as useCoreRouterProviderProps,
} from '@reactionable/core/lib/router/Router';
import React, { PropsWithChildren } from 'react';
import { BrowserRouter, MemoryRouter, useRouteMatch } from 'react-router-dom';

import { ILinkProps, RouterLink } from './link/Link';
import { renderRoutes } from './route/Route';

export type IRouterProviderProps = ICoreRouterProviderProps<ILinkProps>;

export function BrowserRouterComponent({ children }: PropsWithChildren<IRouterProviderProps>) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export function MemoryRouterComponent({ children }: PropsWithChildren<IRouterProviderProps>) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

export const useRouterProviderProps = (
  props: Partial<IRouterProviderProps> = {}
): IRouterProviderProps => {
  return {
    ...useCoreRouterProviderProps(),
    Component: BrowserRouterComponent,
    RouterLink,
    useRouteMatch,
    renderRoutes: renderRoutes as IRenderRoutes,
    ...props,
  };
};

export const RouterContextProvider = (props?: PropsWithChildren<Partial<IRouterProviderProps>>) => {
  return <CoreRouterContextProvider {...useRouterProviderProps()} {...props} />;
};
