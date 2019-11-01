import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { lazyLoad } from '../../ui/loader/Loader';

export type IRouteProps = Omit<RouteProps, 'component'> & {
    component: React.LazyExoticComponent<any>;
};

export function LazyRoute({ component, ...routeProps }: React.PropsWithChildren<IRouteProps>) {
    return <Route {...routeProps} component={lazyLoad(component)} {...routeProps} />;
};