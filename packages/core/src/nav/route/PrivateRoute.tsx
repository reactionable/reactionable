import React, { ReactElement, PropsWithChildren } from 'react';
import { Redirect } from 'react-router-dom';
import { IUser, useIdentityContext } from '../../identity/Identity';
import { useUIContext } from '../../ui/UI';
import { LazyRoute, ILazyRouteProps } from './LazyRoute';
import { IUseLayoutProps } from '../../ui/layout/Layout';

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
