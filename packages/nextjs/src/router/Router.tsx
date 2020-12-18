import {
  IRenderRoutes,
  IRouteMatch,
  IRouteMatchParams,
  renderRoutes,
} from "@reactionable/core/lib/router/Route";
import {
  RouterContextProvider as CoreRouterContextProvider,
  IRouterProviderProps as ICoreRouterProviderProps,
  IRouter,
  useRouterProviderProps as useCoreRouterProviderProps,
} from "@reactionable/core/lib/router/Router";
import { IRouterLinkComponent } from "@reactionable/core/lib/router/RouterLink";
import { useRouter as nextUseRouter } from "next/router";
import { PropsWithChildren, ReactElement } from "react";

import { IRouterLinkProps, RouterLink } from "./RouterLink";

export type IRouterProviderProps = ICoreRouterProviderProps<IRouterLinkProps>;

export function useRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouteMatch<RouteMatchParams> {
  const router = nextUseRouter();
  return {
    params: (router.query as RouteMatchParams) || {},
    url: router.route,
    isExact: true,
    path: router.pathname,
  };
}

export function useRouter<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouter<RouteMatchParams> {
  const router = nextUseRouter();
  const match = useRouteMatch<RouteMatchParams>();

  return {
    match,
    push: router.push,
  };
}

export const useRouterProviderProps = (
  props: Partial<IRouterProviderProps> = {}
): IRouterProviderProps => {
  return {
    ...useCoreRouterProviderProps(),
    RouterLink: RouterLink as IRouterLinkComponent<IRouterLinkProps>,
    useRouter,
    renderRoutes: renderRoutes as IRenderRoutes,
    Component: undefined, // Next is providing its router context provider
    ...props,
  };
};

export const RouterContextProvider = (
  props?: PropsWithChildren<Partial<IRouterProviderProps>>
): ReactElement => {
  return <CoreRouterContextProvider {...useRouterProviderProps(props)} />;
};
