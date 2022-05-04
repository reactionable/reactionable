import { IRouteMatchParams } from "@reactionable/core/lib/router/Route";
import { IRouter } from "@reactionable/core/lib/router/useRouter";
import { useRouter as nextUseRouter } from "next/router";
import { useRouteMatch } from "./useRouteMatch";

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
