import { ExoticComponent, ReactElement } from "react";

export type IRouteProps = {
  privateRoute?: boolean;
  exact?: boolean;
  path?: string;
  component: ExoticComponent<never>;
};

export type IRouteMatchParams = Record<string, string | string[] | undefined>;
export type IRouteMatch<RouteMatchParams extends IRouteMatchParams = IRouteMatchParams> = {
  params: RouteMatchParams;
  isExact: boolean;
  path: string;
  url: string;
};

export type IUseRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
> = () => IRouteMatch<RouteMatchParams>;

export function useRouteMatchCore<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouteMatch<RouteMatchParams> {
  return { params: {} as RouteMatchParams, isExact: true, path: "", url: "" };
}

export type IRenderRoutes<RouteProps extends IRouteProps = IRouteProps> = (
  routes: RouteProps[]
) => ReactElement;

export function renderRoutes<RouteProps extends IRouteProps = IRouteProps>(
  routes: RouteProps[]
): never {
  routes;
  throw new Error(
    '@reactionable/core does not provide routes rendering function, please install a "@reactionable/router-*" package'
  );
}
