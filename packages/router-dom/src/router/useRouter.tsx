import { IRouteMatch, IRouteMatchParams } from "@reactionable/core/lib/router/Route";
import { IRouter } from "@reactionable/core/lib/router/useRouter";
import { useNavigate } from "react-router-dom";
import { useRouteMatch } from "./useRouteMatch";

export function useRouter<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouter<RouteMatchParams> {
  const match = useRouteMatch() as IRouteMatch<RouteMatchParams>;
  const navigate = useNavigate();

  return {
    match,
    push: navigate.bind(navigate),
  };
}
