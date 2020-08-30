import React, { PropsWithChildren, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

import { IUser, useIdentityContext } from '../../identity/Identity';
import { IUseLayoutProps } from '../../ui/layout/Layout';
import { useUIContext } from '../../ui/UI';
import { ILazyRouteProps, LazyRoute } from './LazyRoute';

function renderPrivateRoute(user: undefined | null) {
  const { loader } = useUIContext().useLoader({});
  return (props: any): ReactElement => {
    switch (user) {
      case undefined:
        return loader;
      case null:
        return <Redirect to="/" />;
    }
  };
}

export function PrivateRoute<LP extends IUseLayoutProps, User extends IUser>(
  props: PropsWithChildren<ILazyRouteProps<LP>>
) {
  const { user } = useIdentityContext<User>();

  if (user) {
    return <LazyRoute {...props} />;
  }
  const { component, ...routeProps } = props;
  return <LazyRoute {...routeProps} render={renderPrivateRoute(user)} />;
}
