import { IRenderRoutes } from "@reactionable/core/lib/router/Route";
import {
  IRouterProviderProps as ICoreRouterProviderProps,
  useRouterProviderProps as useCoreRouterProviderProps,
} from "@reactionable/core/lib/router/useRouterProviderProps";
import { IRouterLinkComponent } from "@reactionable/core/lib/router/RouterLink";

import { renderRoutes } from "../route/Route";
import { BrowserRouterComponent } from "./BrowserRouterComponent";
import { RouterComponentProps } from "./RouterComponent";
import { IRouterLinkProps, RouterLink } from "./RouterLink";
import { useRouteMatch } from "./useRouteMatch";

export type IRouterProviderProps = ICoreRouterProviderProps<IRouterLinkProps, RouterComponentProps>;

export const useRouterProviderProps = (
  props: Partial<IRouterProviderProps> = {}
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
