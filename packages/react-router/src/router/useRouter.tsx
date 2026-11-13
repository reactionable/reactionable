import type { IRouteMatchParams, IRouter } from "@reactionable/core";
import { useNavigate } from "react-router";
import { useRouteMatch } from "./useRouteMatch";

export function useRouter<
	RouteMatchParams extends IRouteMatchParams = IRouteMatchParams,
>(): IRouter<RouteMatchParams> {
	const match = useRouteMatch<RouteMatchParams>();
	const navigate = useNavigate();

	return {
		match,
		push: navigate.bind(navigate),
	};
}
