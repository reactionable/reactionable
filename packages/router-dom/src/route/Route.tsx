import { IRouteProps as ICoreRouteProps } from "@reactionable/core/lib/router/Route";
import { ComponentType, LazyExoticComponent, ReactElement, ReactNode } from "react";
import { Routes } from "react-router-dom";

import { ILazyRouteProps, LazyRoute } from "./LazyRoute";
import { useCaptureRouteNotFound } from "./NotFound";
import { PrivateRoute } from "./PrivateRoute";

export type IRouteProps = ICoreRouteProps & ILazyRouteProps;

export function renderRoute({ privateRoute, component, ...routeProps }: IRouteProps): ReactElement {
  const key = `${routeProps.exact ? "exact" : "non-exact"}-${routeProps.path}-${
    privateRoute ? "private" : "public"
  }-${component.name}`;

  if (privateRoute) {
    return <PrivateRoute key={key} component={component} {...routeProps} />;
  }
  return <LazyRoute key={key} component={component} {...routeProps} />;
}

export function renderRoutes(routes: IRouteProps[]): ReactNode {
  let children = <>{routes.filter((route) => route.path || !route.component).map(renderRoute)}</>;

  const notFoundRoute = routes.find((route) => !route.path && route.component);

  if (notFoundRoute) {
    const CaptureRouteNotFound = useCaptureRouteNotFound(
      notFoundRoute.component as LazyExoticComponent<ComponentType>
    );
    children = <CaptureRouteNotFound>{children}</CaptureRouteNotFound>;
  }

  return <Routes>{children}</Routes>;
}
