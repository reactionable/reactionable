import { BrowserRouter as Router, useRouteMatch } from 'react-router-dom';
import {
  IRouterContextProviderProps as ICoreRouterContextProviderProps,
  RouterContextProvider as CoreRouterContextProvider,
} from '@reactionable/core/lib/router/Router';
import React, { ComponentType, PropsWithChildren } from 'react';
import { ILinkProps, RouterLink } from './link/Link';
import { renderRoutes } from './route/Route';
import { IRenderRoutes } from '@reactionable/core/lib/router/Route';

export type IRouterContextProviderProps = ICoreRouterContextProviderProps<ILinkProps> & {
  Router: ComponentType<any>;
};

export const useRouterContextProviderProps = (
  props: Partial<IRouterContextProviderProps> = {}
): IRouterContextProviderProps => {
  return {
    Router,
    RouterLink,
    useRouteMatch,
    renderRoutes: renderRoutes as IRenderRoutes,
    ...props,
  };
};

export const RouterContextProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<IRouterContextProviderProps>>) => {
  return (
    <CoreRouterContextProvider {...useRouterContextProviderProps()} {...props}>
      <Router>{children}</Router>
    </CoreRouterContextProvider>
  );
};
