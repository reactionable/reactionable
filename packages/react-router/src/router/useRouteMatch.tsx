import type { IRouteMatch, IRouteMatchParams } from "@reactionable/core";
import { useLocation, useParams, useResolvedPath } from "react-router";

export function useRouteMatch<
	RouteMatchParams extends IRouteMatchParams = IRouteMatchParams,
>(): IRouteMatch<RouteMatchParams> {
	const params = useParams();
	const location = useLocation();
	const { pathname } = useResolvedPath(".");
	return {
		params: params as RouteMatchParams,
		isIndex: location.pathname === pathname,
		path: pathname,
		url: pathname,
	};
}
