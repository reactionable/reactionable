import { ComponentType, LazyExoticComponent, PropsWithChildren, ReactElement } from "react";

import { IIdentityProviderProps } from "../identity/Identity";
import { IRouteProps } from "../router/Route";
import { IRouterProviderProps } from "../router/Router";
import { IUIProviderProps } from "../ui/UI";
import { Wrapper } from "./Wrapper";

export interface IAppProps<
  IdentityProviderProps extends IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps,
  RouterProviderProps extends IRouterProviderProps
> {
  routes?: Array<IRouteProps>;
  HomeComponent?: LazyExoticComponent<ComponentType>;
  NotFoundComponent?: LazyExoticComponent<ComponentType>;
  identity?: IdentityProviderProps;
  ui?: UIProviderProps;
  router?: RouterProviderProps;
}

export function App<
  IdentityProviderProps extends IIdentityProviderProps = IIdentityProviderProps,
  UIProviderProps extends IUIProviderProps = IUIProviderProps,
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
  IAppProps<IdentityProviderProps, UIProviderProps, RouterProviderProps>
>): ReactElement {
  if (router) {
    if (HomeComponent) {
      routes.unshift({ component: HomeComponent, exact: true, path: "/", privateRoute: false });
    }
    if (NotFoundComponent) {
      routes.push({ component: NotFoundComponent, privateRoute: false });
    }

    if (routes.length) {
      children = router.renderRoutes(routes);
    }
  }

  return (
    <Wrapper identity={identity} ui={ui} router={router}>
      {children}
    </Wrapper>
  );
}
