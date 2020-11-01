import { useIdentityContext } from '@reactionable/core/lib/identity/Identity';
import { useUIContext } from '@reactionable/core/lib/ui/UI';
import React, { PropsWithChildren, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

import { ILazyRouteProps, LazyRoute } from './LazyRoute';

function renderPrivateRoute(user: undefined | null) {
  const { loader } = useUIContext().useLoader({});
  return (props: any): ReactNode => {
    switch (user) {
      case undefined:
        return loader;
      case null:
        return <Redirect to="/" />;
    }
  };
}

export function PrivateRoute(props: PropsWithChildren<ILazyRouteProps>) {
  const { user } = useIdentityContext();

  if (user) {
    return <LazyRoute {...props} />;
  }
  const { component, ...routeProps } = props;
  return <LazyRoute {...routeProps} render={renderPrivateRoute(user)} />;
}
