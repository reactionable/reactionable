import { IRouteMatch, IRouteMatchParams } from "./Route";
import { useRouteMatch } from "./useRouteMatch";

export type IRouter<RouteMatchParams extends IRouteMatchParams = IRouteMatchParams> = {
  match: IRouteMatch<RouteMatchParams>;
  push: (url: string) => void;
};

export type IUseRouter<RouteMatchParams extends IRouteMatchParams = IRouteMatchParams> =
  () => IRouter<RouteMatchParams>;

export function useRouter<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouter<RouteMatchParams> {
  const match = useRouteMatch<RouteMatchParams>();

  return {
    match,
    push: (url: string) => location.assign(url),
  };
}
