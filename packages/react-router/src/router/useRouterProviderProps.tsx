import {
	type IRouterProviderProps as ICoreRouterProviderProps,
	type IRenderRoutes,
	type IRouterLinkComponent,
	useRouterProviderProps as useCoreRouterProviderProps,
} from "@reactionable/core";

import { renderRoutes } from "../route/Route";
import { BrowserRouterComponent } from "./BrowserRouterComponent";
import type { RouterComponentProps } from "./RouterComponent";
import { type IRouterLinkProps, RouterLink } from "./RouterLink";
import { useRouteMatch } from "./useRouteMatch";

export type IRouterProviderProps = ICoreRouterProviderProps<
	IRouterLinkProps,
	RouterComponentProps
>;

export const useRouterProviderProps = (
	props: Partial<IRouterProviderProps> = {},
): IRouterProviderProps => {
	return {
		...useCoreRouterProviderProps(),
		Component: BrowserRouterComponent,
		RouterLink: RouterLink as IRouterLinkComponent<IRouterLinkProps>,
		useRouteMatch,
		renderRoutes: renderRoutes as IRenderRoutes,
		...props,
	};
};
