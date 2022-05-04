import { IProviderProps } from "../app/Provider";
import { IRouter, useRouter } from "./useRouter";
import { IRenderRoutes, IRouteMatch, IRouteMatchParams, renderRoutes } from "./Route";
import { IRouterLinkComponent, IRouterLinkProps, RouterLink } from "./RouterLink";
import { useRouteMatch } from "./useRouteMatch";

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
    RouterLink,
    useRouter,
    useRouteMatch,
    renderRoutes,
    ...props,
  } as IRouterProviderProps<RouterLinkProps>;
}
