import { IRouteMatch, IRouteMatchParams } from "./Route";

export function useRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouteMatch<RouteMatchParams> {
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries()) as RouteMatchParams;
  return {
    params,
    isIndex: true,
    path: location.pathname,
    url: location.href,
  };
}
