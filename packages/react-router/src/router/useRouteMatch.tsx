import { IRouteMatch, IRouteMatchParams } from "@reactionable/core";
import { useParams } from "react-router";

export function useRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams,
>(): IRouteMatch<RouteMatchParams> {
  return useParams() as unknown as IRouteMatch<RouteMatchParams>;
}
