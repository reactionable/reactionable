import { ExoticComponent, ReactNode } from 'react';

export type IRouteProps = {
  privateRoute?: boolean;
  exact?: boolean;
  path?: string;
  component: ExoticComponent<any>;
};

export type IRouteMatch<Params extends { [K in keyof Params]?: string } = {}> = {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
};

export type IUseRouteMatch<
  Params extends { [K in keyof Params]?: string } = {}
> = () => IRouteMatch<Params>;

export function useRouteMatchCore<
  Params extends { [K in keyof Params]?: string } = {}
>(): IRouteMatch<Params> {
  return { params: {} as Params, isExact: true, path: '', url: '' };
}

export type IRenderRoutes<RouteProps extends IRouteProps = IRouteProps> = (
  routes: RouteProps[]
) => ReactNode;

export function renderRoutes<RouteProps extends IRouteProps = IRouteProps>(
  routes: RouteProps[]
): never {
  throw new Error(
    '@reactionable/core does not provide routes rendering function, please install a "@reactionable/router-*" package'
  );
}
