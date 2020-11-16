import { IRenderRoutes, IUseRouteMatch, renderRoutes } from "@reactionable/core/lib/router/Route";
import {
  RouterContextProvider as CoreRouterContextProvider,
  IRouterProviderProps as ICoreRouterProviderProps,
  useRouterProviderProps as useCoreRouterProviderProps,
} from "@reactionable/core/lib/router/Router";
import { useRouter } from "next/router";
import React, { PropsWithChildren, ReactElement } from "react";

import { ILinkProps, RouterLink } from "./RouterLink";

export type IRouterProviderProps = ICoreRouterProviderProps<ILinkProps>;

export const useRouteMatch: IUseRouteMatch = () => {
  const router = useRouter();
  return {
    params: router.query || {},
    url: router.route,
    isExact: true,
    path: router.pathname,
  };
};

export const useRouterProviderProps = (
  props: Partial<IRouterProviderProps> = {}
): IRouterProviderProps => {
  return {
    ...useCoreRouterProviderProps(),
    RouterLink,
    useRouteMatch,
    renderRoutes: renderRoutes as IRenderRoutes,
    Component: undefined, // Next is providing its router context provider
    ...props,
  };
};

export const RouterContextProvider = (
  props?: PropsWithChildren<Partial<IRouterProviderProps>>
): ReactElement => {
  return <CoreRouterContextProvider {...useRouterProviderProps()} {...props} />;
};
