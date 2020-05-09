import React, { LazyExoticComponent, PropsWithChildren, StrictMode } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { IdentityContextProvider, IIdentityContextProviderProps } from '../identity/Identity';
import { IRouteProps, renderRoute } from '../nav/route/Route';
import { IUIContextProviderProps, UIContextProvider } from '../ui/UI';
import { IUseLayoutProps } from '../ui/layout/Layout';
import { useCaptureRouteNotFound } from '../nav/route/NotFound';

export interface IAppProps<
  ICP extends IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps,
  LP extends IUseLayoutProps
> {
  routes: Array<IRouteProps<LP>>;
  HomeComponent?: LazyExoticComponent<any>;
  NotFoundComponent?: LazyExoticComponent<any>;
  identity?: ICP;
  ui?: UICP;
  layout?: LP;
}

export function App<
  ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
  UICP extends IUIContextProviderProps = IUIContextProviderProps,
  LP extends IUseLayoutProps = IUseLayoutProps
>({
  routes = [],
  HomeComponent,
  NotFoundComponent,
  identity,
  ui,
  layout,
}: PropsWithChildren<IAppProps<ICP, UICP, LP>>) {
  if (HomeComponent) {
    routes.unshift({ component: HomeComponent, exact: true, path: '/', privateRoute: false });
  }
  if (NotFoundComponent) {
    routes.push({ component: NotFoundComponent, privateRoute: false });
  }

  let routerContent = (
    <Switch>
      {routes.map((route) => renderRoute<LP>({ layout, ...route }))}
    </Switch>
  );

  if (NotFoundComponent) {
    const CaptureRouteNotFound = useCaptureRouteNotFound(NotFoundComponent);
    routerContent = <CaptureRouteNotFound>{routerContent}</CaptureRouteNotFound>;
  }

  routerContent = <Router>{routerContent}</Router>;

  if (identity) {
    routerContent = (
      <IdentityContextProvider {...identity}>{routerContent}</IdentityContextProvider>
    );
  }

  if (ui) {
    routerContent = <UIContextProvider {...ui}>{routerContent}</UIContextProvider>;
  }

  return <StrictMode>{routerContent}</StrictMode>;
}
