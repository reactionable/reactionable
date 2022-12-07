import { lazyLoad } from "@reactionable/core/lib/ui/loader/Loader";
import {
  ComponentType,
  LazyExoticComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { Route, RouteProps } from "react-router-dom";

export type ILazyRouteProps = Omit<RouteProps, "component"> & {
  component?: LazyExoticComponent<ComponentType>;
};

export function renderLazyRoute({
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

export function LazyRoute({
  component,
  index,
  ...routeProps
}: PropsWithChildren<ILazyRouteProps>): ReactElement {
  return (
    <Route
      element={renderLazyRoute({
        component,
      })}
      index={index === false ? index : undefined}
      {...routeProps}
    />
  );
}
