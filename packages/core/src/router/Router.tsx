import { IProviderProps, createProvider } from "../app/Provider";
import { ILinkProps } from "./Link";
import {
  IRenderRoutes,
  IRouteMatch,
  IRouteMatchParams,
  IUseRouteMatch,
  renderRoutes,
  useRouteMatchCore,
} from "./Route";
import { IRouterLinkComponent, RouterLink } from "./RouterLink";

export type IRouterProviderProps<LinkProps extends ILinkProps = ILinkProps> = IProviderProps<{
  RouterLink: IRouterLinkComponent<LinkProps>;
  useRouteMatch: IUseRouteMatch;
  renderRoutes: IRenderRoutes;
}>;

export function useRouterProviderProps(): IRouterProviderProps {
  return {
    RouterLink,
    useRouteMatch: useRouteMatchCore,
    renderRoutes,
  };
}

export const {
  Context: RouterContext,
  ContextProvider: RouterContextProvider,
  useContext: useRouterContext,
} = createProvider<IRouterProviderProps>(useRouterProviderProps());

export function useRouteMatch<
  RouteMatchParams extends IRouteMatchParams = IRouteMatchParams
>(): IRouteMatch<RouteMatchParams> {
  const { useRouteMatch } = useRouterContext();
  return useRouteMatch() as IRouteMatch<RouteMatchParams>;
}
