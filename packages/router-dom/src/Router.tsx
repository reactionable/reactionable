import { IRenderRoutes } from '@reactionable/core/lib/router/Route';
import {
  RouterContextProvider as CoreRouterContextProvider,
  IRouterProviderProps as ICoreRouterProviderProps,
  useRouterProviderProps as useCoreRouterProviderProps,
} from '@reactionable/core/lib/router/Router';
import React, { PropsWithChildren } from 'react';
import { BrowserRouter as Router, useRouteMatch } from 'react-router-dom';

import { ILinkProps, RouterLink } from './link/Link';
import { renderRoutes } from './route/Route';

export type IRouterProviderProps = ICoreRouterProviderProps<ILinkProps>;

export const useRouterProviderProps = (
  props: Partial<IRouterProviderProps> = {}
): IRouterProviderProps => {
  return {
    ...useCoreRouterProviderProps(),
    Component: Router,
    RouterLink,
    useRouteMatch,
    renderRoutes: renderRoutes as IRenderRoutes,
    ...props,
  };
};

export const RouterContextProvider = (props?: PropsWithChildren<Partial<IRouterProviderProps>>) => {
  return <CoreRouterContextProvider {...useRouterProviderProps()} {...props} />;
};
