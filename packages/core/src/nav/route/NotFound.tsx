import React, { LazyExoticComponent } from 'react';
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom';
import { lazyLoad } from '../../ui/loader/Loader';

export const RouteNotFound = () => <Redirect to={{ state: { notFoundError: true } }} />;

export const useCaptureRouteNotFound = (notFoundComponent: LazyExoticComponent<any>) => withRouter(({ children, location }: RouteComponentProps & { children: any }) => {
    const NotFoundComponent = lazyLoad(notFoundComponent);
    return location && location.state && location.state.notFoundError ? <NotFoundComponent /> : children ? children : null;
});