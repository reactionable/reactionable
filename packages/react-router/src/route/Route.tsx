import type { IRouteProps as ICoreRouteProps } from "@reactionable/core";
import type { ReactElement } from "react";
import { Route, Routes } from "react-router";

import { type ILazyRouteProps, renderLazyRoute } from "./LazyRoute";
import { type INotFoundComponent, useCaptureRouteNotFound } from "./NotFound";
import { PrivateRoute } from "./PrivateRoute";

export type IRouteProps = ICoreRouteProps & ILazyRouteProps;

export function renderRoute({
	privateRoute,
	...routeProps
}: IRouteProps): ReactElement {
	const key = `${routeProps.index ? "index" : "non-index"}-${routeProps.path}-${privateRoute ? "private" : "public"}`;
	if (privateRoute) {
		return (
			<Route key={key} element={<PrivateRoute />}>
				{renderLazyRoute(routeProps)}
			</Route>
		);
	}
	return renderLazyRoute({ ...routeProps, key });
}

export function renderRoutes(routes: IRouteProps[]): ReactElement {
	const notFoundRoute = routes.find((route) => !route.index && !route.path);
	const children = (
		<Routes>
			{routes.map((route) =>
				renderRoute(route === notFoundRoute ? { ...route, path: "*" } : route),
			)}
		</Routes>
	);
	if (notFoundRoute) {
		const CaptureRouteNotFound = useCaptureRouteNotFound(
			notFoundRoute.component as INotFoundComponent,
		);
		return <CaptureRouteNotFound>{children}</CaptureRouteNotFound>;
	}
	return children;
}
