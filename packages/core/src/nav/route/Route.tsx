import React from 'react';
import { IUseLayoutProps } from '../../ui/layout/Layout';
import { ILazyRouteComponentProps, LazyRoute } from './LazyRoute';
import { PrivateRoute } from './PrivateRoute';

export type IRouteProps<LP extends IUseLayoutProps> = ILazyRouteComponentProps<LP> & {
    privateRoute?: boolean;
};

export function renderRoute<LP extends IUseLayoutProps>({
    privateRoute,
    component,
    ...routeProps
}: IRouteProps<LP>) {
    const key = `${routeProps.exact ? 'exact' : 'non-exact'}-${routeProps.path}-${privateRoute ? 'private' : 'public'}-${component.name}`;
    if (privateRoute) {
        return <PrivateRoute
            key={key}
            component={component}
            {...routeProps}
        />;
    }
    return <LazyRoute
        key={key}
        component={component}
        {...routeProps}
    />;
};
