import { ComponentType, LazyExoticComponent, PropsWithChildren, ReactElement } from "react";

import { IRouteProps, renderRoutes } from "../route/Route";

export type RouterComponentProps = {
  routes?: Array<IRouteProps>;
  HomeComponent?: LazyExoticComponent<ComponentType>;
  NotFoundComponent?: LazyExoticComponent<ComponentType>;
};

export function RouterComponent({
  children,
  routes,
  HomeComponent,
  NotFoundComponent,
}: PropsWithChildren<RouterComponentProps>): ReactElement {
  const routesToRender: Array<IRouteProps> = routes || [];

  if (HomeComponent) {
    const hasHomeRoute = routesToRender.some(({ path }) => path === "/");
    if (!hasHomeRoute) {
      routesToRender.unshift({
        component: HomeComponent,
        index: true,
        path: "/",
        privateRoute: false,
      });
    }
  }

  if (NotFoundComponent) {
    const hasNotFoundRoute = routesToRender.some(({ path }) => path === undefined);
    if (!hasNotFoundRoute) {
      routesToRender.push({ component: NotFoundComponent, privateRoute: false });
    }
  }

  if (routesToRender.length) {
    children = renderRoutes(routesToRender);
  }

  return <>{children}</>;
}
