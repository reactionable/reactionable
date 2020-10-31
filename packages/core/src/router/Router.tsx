import React, { PropsWithChildren, createContext, useContext } from 'react';
import { ILinkProps, IRouterLinkComponent, RouterLink } from './Link';
import {
  IRenderRoutes,
  IUseRouteMatch,
  useRouteMatchCore,
  renderRoutes,
  IRouteMatch,
} from './Route';

export interface IRouterContext<LinkProps extends ILinkProps> {
  RouterLink: IRouterLinkComponent<LinkProps>;
  useRouteMatch: IUseRouteMatch;
  renderRoutes: IRenderRoutes;
}

export const RouterContext = createContext<IRouterContext<any>>({
  RouterLink,
  useRouteMatch: useRouteMatchCore,
  renderRoutes,
});

export type IRouterContextProviderProps<LinkProps extends ILinkProps = ILinkProps> = IRouterContext<
  LinkProps
>;

export function RouterContextProvider<LinkProps extends ILinkProps>(
  props: PropsWithChildren<IRouterContextProviderProps<LinkProps>>
) {
  return <RouterContext.Provider value={props}>{props.children}</RouterContext.Provider>;
}

export function useRouterContext<LinkProps extends ILinkProps>() {
  return useContext<IRouterContext<LinkProps>>(RouterContext);
}

export function useRouteMatch<
  Params extends { [K in keyof Params]?: string } = {},
  LinkProps extends ILinkProps = ILinkProps
>(): IRouteMatch<Params> {
  const { useRouteMatch } = useRouterContext<LinkProps>();
  return useRouteMatch() as IRouteMatch<Params>;
}
