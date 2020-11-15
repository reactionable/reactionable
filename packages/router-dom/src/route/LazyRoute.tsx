import React, { PropsWithChildren, ReactElement } from "react";
import { Route, RouteProps } from "react-router-dom";

type ILazyRouteRendererProps = {
  render: () => ReactElement;
};

function LazyRouteRenderer({ render }: ILazyRouteRendererProps): ReactElement {
  return render();
}

export type ILazyRouteProps = Omit<RouteProps, "render"> & ILazyRouteRendererProps;

export function LazyRoute({
  render,
  ...routeProps
}: PropsWithChildren<ILazyRouteProps>): ReactElement {
  const renderLazyRoute = () => <LazyRouteRenderer render={render} />;

  return <Route {...routeProps} render={renderLazyRoute} />;
}
