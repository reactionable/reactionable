import { IRouteMatch, IRouteMatchParams } from "@reactionable/core/lib/router/Route";
import { useRouter as nextUseRouter } from "next/router";

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
