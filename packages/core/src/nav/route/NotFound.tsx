import React, { LazyExoticComponent } from 'react';
import { Redirect, RouteComponentProps, useLocation, withRouter } from 'react-router-dom';

import { lazyLoad } from '../../ui/loader/Loader';

export const RouteNotFound = () => <Redirect to={{ state: { notFoundError: true } }} />;

export const useCaptureRouteNotFound = (notFoundComponent: LazyExoticComponent<any>) =>
  withRouter(({ children }: RouteComponentProps & { children: any }) => {
    const NotFoundComponent = lazyLoad(notFoundComponent);
    const location = useLocation<{ notFoundError: boolean }>();
    return location && location.state && location.state.notFoundError ? (
      <NotFoundComponent />
    ) : children ? (
      children
    ) : null;
  });
