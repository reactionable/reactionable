import { IRouteProps as ICoreRouteProps } from "@reactionable/core/lib/router/Route";
import { ReactElement, ReactNode } from "react";
import { Routes } from "react-router-dom";

import { ILazyRouteProps, LazyRoute } from "./LazyRoute";
import { INotFoundComponent, useCaptureRouteNotFound } from "./NotFound";
import { PrivateRoute } from "./PrivateRoute";

export type IRouteProps = ICoreRouteProps & ILazyRouteProps;

export const Route = ({ privateRoute, ...routeProps }: IRouteProps): ReactElement => {
  if (privateRoute) {
    return <PrivateRoute {...routeProps} />;
  }
  return <LazyRoute {...routeProps} />;
};

export function renderRoute(props: IRouteProps): ReactElement {
  const key = `${props.index ? "index" : "non-index"}-${props.path}-${
    props.privateRoute ? "private" : "public"
  }-${props.component.name}`;

  return <Route key={key} {...props} />;
}

export function renderRoutes(routes: IRouteProps[]): ReactNode {
  let children = <>{routes.filter((route) => route.path || !route.component).map(() => null)}</>;

  const notFoundRoute = routes.find((route) => !route.path && route.component);

  if (notFoundRoute) {
    const CaptureRouteNotFound = useCaptureRouteNotFound(
      notFoundRoute.component as INotFoundComponent
    );
    children = <CaptureRouteNotFound>{children}</CaptureRouteNotFound>;
  }

  return <Routes>{children}</Routes>;
}
