import { IRenderRoutes, IRouteMatch, IRouteMatchParams } from "@reactionable/core/lib/router/Route";
import {
  RouterContextProvider as CoreRouterContextProvider,
  IRouterProviderProps as ICoreRouterProviderProps,
  IRouter,
  useRouterContext as useCoreRouterContext,
  useRouterProviderProps as useCoreRouterProviderProps,
} from "@reactionable/core/lib/router/Router";
import { IRouterLinkComponent } from "@reactionable/core/lib/router/RouterLink";
import { ComponentType, LazyExoticComponent, PropsWithChildren, ReactElement } from "react";
import {
  BrowserRouter,
  MemoryRouter,
  useHistory,
  useRouteMatch as useRouteMatchRouterDom,
} from "react-router-dom";

import { IRouteProps, renderRoutes } from "../route/Route";
import { IRouterLinkProps, RouterLink } from "./RouterLink";

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
        exact: true,
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

export function BrowserRouterComponent(
  props: PropsWithChildren<RouterComponentProps>
): ReactElement {
  return (
    <BrowserRouter>
      <RouterComponent {...props} />
    </BrowserRouter>
  );
}

export function MemoryRouterComponent(
  props: PropsWithChildren<RouterComponentProps>
): ReactElement {
  return (
    <MemoryRouter>
      <RouterComponent {...props} />
    </MemoryRouter>
  );
}

export function useRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouteMatch<RouteMatchParams> {
  return useRouteMatchRouterDom() as IRouteMatch<RouteMatchParams>;
}

export function useRouter<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouter<RouteMatchParams> {
  const match = useRouteMatch() as IRouteMatch<RouteMatchParams>;
  const history = useHistory();

  return {
    match,
    push: history.push.bind(history),
  };
}

export type IRouterProviderProps = ICoreRouterProviderProps<IRouterLinkProps> &
  RouterComponentProps;

export const useRouterProviderProps = (
  props: Partial<IRouterProviderProps> = {}
): IRouterProviderProps => {
  return {
    ...useCoreRouterProviderProps(),
    Component: BrowserRouterComponent,
    RouterLink: RouterLink as IRouterLinkComponent<IRouterLinkProps>,
    useRouteMatch,
    renderRoutes: renderRoutes as IRenderRoutes,
    ...props,
  };
};

export const RouterContextProvider = (
  props?: PropsWithChildren<Partial<IRouterProviderProps>>
): ReactElement => {
  return <CoreRouterContextProvider {...useRouterProviderProps(props)} />;
};

export function useRouterContext(): IRouterProviderProps {
  return useCoreRouterContext();
}
