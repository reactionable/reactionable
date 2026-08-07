import {
	type IRenderRoutes,
	type IRouterLinkComponent,
	renderRoutes,
	useRouterProviderProps as useCoreRouterProviderProps,
} from "@reactionable/core";
import { type IRouterLinkProps, RouterLink } from "./RouterLink";
import { useRouter } from "./useRouter";
import type { IRouterProviderProps } from "./useRouterContext";

export function useRouterProviderProps(
	props: Partial<IRouterProviderProps> = {},
): IRouterProviderProps {
	return {
		...useCoreRouterProviderProps(),
		RouterLink: RouterLink as IRouterLinkComponent<IRouterLinkProps>,
		useRouter,
		renderRoutes: renderRoutes as IRenderRoutes,
		Component: undefined,
		...props,
	};
}
