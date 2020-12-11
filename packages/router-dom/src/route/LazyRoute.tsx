import { lazyLoad } from "@reactionable/core/lib/ui/loader/Loader";
import {
  ComponentType,
  LazyExoticComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";

export type ILazyRouteProps = Omit<RouteProps, "component"> & {
  component?: LazyExoticComponent<ComponentType>;
};

export function renderLazyRoute({
  component,
  render,
}: {
  component?: LazyExoticComponent<ComponentType>;
  render?: (props: RouteComponentProps) => ReactNode;
}): (props: RouteComponentProps) => ReactNode {
  const LazyRouteComponent = (props: RouteComponentProps): ReactElement => {
    let rendered: ReactNode;
    if (component) {
      const Component = lazyLoad(component);
      rendered = <Component {...props} />;
    } else if (render) {
      rendered = render(props);
    }

    return <>{rendered}</>;
  };

  return LazyRouteComponent;
}

export function LazyRoute({
  component,
  render,
  ...routeProps
}: PropsWithChildren<ILazyRouteProps>): ReactElement {
  return (
    <Route
      render={renderLazyRoute({
        component,
        render,
      })}
      {...routeProps}
    />
  );
}
