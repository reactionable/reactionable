import { IRenderRoutes, IRouteMatch, IRouteMatchParams } from "@reactionable/core/lib/router/Route";
import {
  RouterContextProvider as CoreRouterContextProvider,
  IRouterProviderProps as ICoreRouterProviderProps,
  IRouter,
  useRouterProviderProps as useCoreRouterProviderProps,
} from "@reactionable/core/lib/router/Router";
import React, { PropsWithChildren, ReactElement } from "react";
import {
  BrowserRouter,
  MemoryRouter,
  useHistory,
  useRouteMatch as useRouteMatchRouterDom,
} from "react-router-dom";

import { renderRoutes } from "../route/Route";
import { IRouterLinkProps, RouterLink } from "./RouterLink";

export type IRouterProviderProps = ICoreRouterProviderProps<IRouterLinkProps>;

export function BrowserRouterComponent({ children }: PropsWithChildren<unknown>): ReactElement {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export function MemoryRouterComponent({ children }: PropsWithChildren<unknown>): ReactElement {
  return <MemoryRouter>{children}</MemoryRouter>;
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
    push: history.push,
  };
}

export const useRouterProviderProps = (
  props: Partial<IRouterProviderProps> = {}
): IRouterProviderProps => {
  return {
    ...useCoreRouterProviderProps(),
    Component: BrowserRouterComponent,
    RouterLink,
    useRouteMatch,
    renderRoutes: renderRoutes as IRenderRoutes,
    ...props,
  };
};

export const RouterContextProvider = (
  props?: PropsWithChildren<Partial<IRouterProviderProps>>
): ReactElement => {
  return <CoreRouterContextProvider {...useRouterProviderProps()} {...props} />;
};
