import { ReactElement } from "react";

import { IProviderProps, createProvider } from "../app/Provider";
import { IRenderRoutes, IRouteMatch, IRouteMatchParams, renderRoutes } from "./Route";
import { IRouterLinkComponent, IRouterLinkProps, RouterLink } from "./RouterLink";

export type IRouter<RouteMatchParams extends IRouteMatchParams = IRouteMatchParams> = {
  match: IRouteMatch<RouteMatchParams>;
  push: (url: string) => void;
};

export type IUseRouter<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
> = () => IRouter<RouteMatchParams>;

export function useRouter<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouter<RouteMatchParams> {
  const match = useRouteMatch<RouteMatchParams>();

  return {
    match,
    push: (url: string) => location.assign(url),
  };
}

export function useRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouteMatch<RouteMatchParams> {
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries()) as RouteMatchParams;
  return {
    params,
    isExact: true,
    path: location.pathname,
    url: location.href,
  };
}

export type IRouterProviderProps<
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps,
  ExtraProps extends Record<string, unknown> = Record<string, unknown>
> = IProviderProps<
  {
    RouterLink: IRouterLinkComponent<RouterLinkProps>;
    useRouter: <
      RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
    >() => IRouter<RouteMatchParams>;
    useRouteMatch: <
      RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
    >() => IRouteMatch<RouteMatchParams>;
    renderRoutes: IRenderRoutes;
  } & ExtraProps
>;

export function useRouterProviderProps<
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps,
  ExtraProps extends Record<string, unknown> = Record<string, unknown>
>(
  props?: Partial<IRouterProviderProps<RouterLinkProps, ExtraProps>>
): IRouterProviderProps<RouterLinkProps> {
  return {
    RouterLink: RouterLink as IRouterLinkComponent<RouterLinkProps>,
    useRouter,
    useRouteMatch,
    renderRoutes,
    ...props,
  };
}

const { Context, ContextProvider, useContext } = createProvider<
  IRouterProviderProps<IRouterLinkProps>
>(useRouterProviderProps());

export function RouterContextProvider<
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps,
  ExtraProps extends Record<string, unknown> = Record<string, unknown>
>(props: IRouterProviderProps<RouterLinkProps, ExtraProps>): ReactElement {
  return <ContextProvider {...(props as IRouterProviderProps)} />;
}
export const RouterContext = Context;

export function useRouterContext<
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps,
  ExtraProps extends Record<string, unknown> = Record<string, unknown>
>(): IRouterProviderProps<RouterLinkProps, ExtraProps> {
  return (useContext() as unknown) as IRouterProviderProps<RouterLinkProps, ExtraProps>;
}
