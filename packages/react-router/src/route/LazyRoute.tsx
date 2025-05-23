import { lazyLoad } from "@reactionable/core";
import {
  ComponentType,
  LazyExoticComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { Route, RouteProps } from "react-router";

export type ILazyRouteProps = Omit<RouteProps, "component"> & {
  key?: string;
  component?: LazyExoticComponent<ComponentType>;
};

export function renderLazyRouteElement({
  component,
  element,
}: {
  component?: LazyExoticComponent<ComponentType>;
  element?: ReactElement;
}): ReactElement {
  let rendered: ReactNode = <></>;
  if (component) {
    const Component = lazyLoad(component);
    rendered = <Component />;
  } else if (element) {
    rendered = element;
  }

  return <>{rendered}</>;
}

export function renderLazyRoute({
  component,
  index,
  key,
  ...routeProps
}: PropsWithChildren<ILazyRouteProps>): ReactElement {
  const props = {
    element: renderLazyRouteElement({
      component,
    }),
    index: index === false ? index : undefined,
    ...routeProps,
  } as RouteProps;

  return <Route key={key} {...props} />;
}
