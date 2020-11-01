import React, { LazyExoticComponent, PropsWithChildren } from 'react';

import { IIdentityProviderProps } from '../identity/Identity';
import { IRouteProps } from '../router/Route';
import { IRouterProviderProps } from '../router/Router';
import { IUseLayoutProps } from '../ui/layout/Layout';
import { IUIContextProviderProps } from '../ui/UI';
import { Wrapper } from './Wrapper';

export interface IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIContextProviderProps,
  UseLayoutProps extends IUseLayoutProps,
  RouterProviderProps extends IRouterProviderProps
> {
  routes: Array<IRouteProps>;
  HomeComponent?: LazyExoticComponent<any>;
  NotFoundComponent?: LazyExoticComponent<any>;
  identity?: IdentityProviderProps;
  ui?: UIProviderProps;
  layout?: UseLayoutProps;
  router?: RouterProviderProps;
}

export function App<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIContextProviderProps = IUIContextProviderProps,
  UseLayoutProps extends IUseLayoutProps = IUseLayoutProps,
  RouterProviderProps extends IRouterProviderProps = IRouterProviderProps
>({
  routes = [],
  HomeComponent,
  NotFoundComponent,
  identity,
  ui,
  router,
  children,
}: PropsWithChildren<
  IAppProps<IdentityProviderProps, UIProviderProps, UseLayoutProps, RouterProviderProps>
>) {
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
