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
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps
> = IProviderProps<{
  RouterLink: IRouterLinkComponent<RouterLinkProps>;
  useRouter: <
    RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
  >() => IRouter<RouteMatchParams>;
  useRouteMatch: <
    RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
  >() => IRouteMatch<RouteMatchParams>;
  renderRoutes: IRenderRoutes;
}>;

export function useRouterProviderProps<
  RouterLinkProps extends IRouterLinkProps = IRouterLinkProps
>(): IRouterProviderProps<RouterLinkProps> {
  return {
    RouterLink,
    useRouter,
    useRouteMatch,
    renderRoutes,
  };
}

export const {
  Context: RouterContext,
  ContextProvider: RouterContextProvider,
  useContext: useRouterContext,
} = createProvider<IRouterProviderProps<IRouterLinkProps>>(useRouterProviderProps());
