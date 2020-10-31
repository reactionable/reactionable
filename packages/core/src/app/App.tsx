import React, { LazyExoticComponent, PropsWithChildren } from 'react';

import { IIdentityContextProviderProps } from '../identity/Identity';
import { IRouteProps } from '../router/Route';
import { IRouterProviderProps } from '../router/Router';
import { IUseLayoutProps } from '../ui/layout/Layout';
import { IUIContextProviderProps } from '../ui/UI';
import { Wrapper } from './Wrapper';

export interface IAppProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps,
  LP extends IUseLayoutProps,
  RCP extends IRouterProviderProps
> {
  routes: Array<IRouteProps>;
  HomeComponent?: LazyExoticComponent<any>;
  NotFoundComponent?: LazyExoticComponent<any>;
  identity?: ICP;
  ui?: UICP;
  layout?: LP;
  router?: RCP;
}

export function App<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  LP extends IUseLayoutProps = IUseLayoutProps,
  RCP extends IRouterProviderProps = IRouterProviderProps
>({
  routes = [],
  HomeComponent,
  NotFoundComponent,
  identity,
  ui,
  router,
  children,
}: PropsWithChildren<IAppProps<ICP, UICP, LP, RCP>>) {
  if (router) {
    if (HomeComponent) {
      routes.unshift({ component: HomeComponent, exact: true, path: '/', privateRoute: false });
    }
    if (NotFoundComponent) {
      routes.push({ component: NotFoundComponent, privateRoute: false });
    }

    children = router.renderRoutes(routes);
  }

  return <Wrapper identity={identity} ui={ui} router={router} children={children} />;
}
