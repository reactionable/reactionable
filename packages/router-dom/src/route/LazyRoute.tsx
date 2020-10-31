import { IUseLayoutProps } from '@reactionable/core/lib/ui/layout/Layout';
import { lazyLoad } from '@reactionable/core/lib/ui/loader/Loader';
import { useUIContext } from '@reactionable/core/lib/ui/UI';
import React, { LazyExoticComponent, PropsWithChildren, ReactNode } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

export type ILazyRouteComponentProps = Omit<RouteProps, 'component'> & {
  component: LazyExoticComponent<any>;
  layout?: IUseLayoutProps;
};

export type ILazyRouteProps = Omit<ILazyRouteComponentProps, 'component'> & {
  component?: LazyExoticComponent<any>;
  render?: (props: RouteComponentProps<any>) => ReactNode;
};

export function renderLazyRoute({
  layout,
  component,
  render,
}: {
  layout?: IUseLayoutProps;
  component?: LazyExoticComponent<any>;
  render?: (props: RouteComponentProps<any>) => ReactNode;
}) {
  const { useLayout } = useUIContext();
  return (props: any): ReactNode => {
    let rendered: ReactNode;
    if (component) {
      const Component = lazyLoad(component);
      rendered = <Component {...props} />;
    } else if (render) {
      rendered = render(props);
    }

    if (!layout) {
      return <>{rendered}</>;
    }

    return useLayout({
      children: rendered,
      ...layout,
    });
  };
}

export function LazyRoute<LP extends IUseLayoutProps>({
  component,
  render,
  layout,
  ...routeProps
}: PropsWithChildren<ILazyRouteProps>) {
  return (
    <Route
      {...routeProps}
      render={renderLazyRoute({
        layout,
        component,
        render,
      })}
    />
  );
}
