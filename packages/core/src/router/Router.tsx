import { IProviderProps, createProvider } from '../app/Provider';
import { ILinkProps, IRouterLinkComponent, RouterLink } from './Link';
import {
  IRenderRoutes,
  IRouteMatch,
  IUseRouteMatch,
  renderRoutes,
  useRouteMatchCore,
} from './Route';

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

export function useRouteMatch<Params extends { [K in keyof Params]?: string } = {}>(): IRouteMatch<
  Params
> {
  const { useRouteMatch } = useRouterContext();
  return useRouteMatch() as IRouteMatch<Params>;
}
