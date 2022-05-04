import { IRouteMatch, IRouteMatchParams } from "@reactionable/core/lib/router/Route";
import { useParams } from "react-router-dom";

export function useRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouteMatch<RouteMatchParams> {
  return useParams() as unknown as IRouteMatch<RouteMatchParams>;
}
