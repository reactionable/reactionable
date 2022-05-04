import { IRenderRoutes, renderRoutes } from "@reactionable/core/lib/router/Route";
import { useRouterProviderProps as useCoreRouterProviderProps } from "@reactionable/core/lib/router/useRouterProviderProps";
import { IRouterLinkComponent } from "@reactionable/core/lib/router/RouterLink";
import { IRouterLinkProps, RouterLink } from "./RouterLink";
import { IRouterProviderProps } from "./useRouterContext";
import { useRouter } from "./useRouter";

export function useRouterProviderProps(
  props: Partial<IRouterProviderProps> = {}
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
