import { IRouteProps as ICoreRouteProps } from '@reactionable/core/lib/router/Route';
import React, { ReactNode } from 'react';
import { Switch } from 'react-router-dom';

import { ILazyRouteComponentProps, LazyRoute } from './LazyRoute';
import { useCaptureRouteNotFound } from './NotFound';
import { PrivateRoute } from './PrivateRoute';

export type IRouteProps = ICoreRouteProps & ILazyRouteComponentProps;

export function renderRoute({ privateRoute, component, ...routeProps }: IRouteProps) {
  const key = `${routeProps.exact ? 'exact' : 'non-exact'}-${routeProps.path}-${
    privateRoute ? 'private' : 'public'
  }-${component.name}`;
  if (privateRoute) {
    return <PrivateRoute key={key} component={component} {...routeProps} />;
  }
  return <LazyRoute key={key} component={component} {...routeProps} />;
}

export function renderRoutes(routes: IRouteProps[]): ReactNode {
  let renderedRoutes: ReactNode = routes.map(renderRoute);

  const notFoundRoute = routes.find((route) => !route.path && route.component);

  if (notFoundRoute) {
    const CaptureRouteNotFound = useCaptureRouteNotFound(notFoundRoute.component);
    renderedRoutes = <CaptureRouteNotFound>{renderedRoutes}</CaptureRouteNotFound>;
  }

  return <Switch>{renderedRoutes}</Switch>;
}
