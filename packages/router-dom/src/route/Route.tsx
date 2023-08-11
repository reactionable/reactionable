import { IRouteProps as ICoreRouteProps } from "@reactionable/core/lib/router/Route";
import { ReactElement, ReactNode } from "react";
import { Routes } from "react-router-dom";

import { ILazyRouteProps, renderLazyRoute } from "./LazyRoute";
import { INotFoundComponent, useCaptureRouteNotFound } from "./NotFound";
import { PrivateRoute } from "./PrivateRoute";

export type IRouteProps = ICoreRouteProps & ILazyRouteProps;

export function renderRoute({ privateRoute, ...routeProps }: IRouteProps): ReactElement {
  const key = `${routeProps.index ? "index" : "non-index"}-${routeProps.path}-${
    privateRoute ? "private" : "public"
  }-${routeProps.component.name}`;

  if (privateRoute) {
    return renderLazyRoute({
      ...routeProps,
      key,
      element: <PrivateRoute />,
      children: renderLazyRoute(routeProps),
    });
  }

  return renderLazyRoute({
    ...routeProps,
    key,
  });
}

export function renderRoutes(routes: IRouteProps[]): ReactNode {
  let children = <>{routes.filter((route) => route.path || !route.component).map(renderRoute)}</>;

  const notFoundRoute = routes.find((route) => !route.path && route.component);

  if (notFoundRoute) {
    const CaptureRouteNotFound = useCaptureRouteNotFound(
      notFoundRoute.component as INotFoundComponent
    );
    children = <CaptureRouteNotFound>{children}</CaptureRouteNotFound>;
  }

  return <Routes>{children}</Routes>;
}
