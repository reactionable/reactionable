import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import React, { PropsWithChildren, ReactElement } from "react";
import { Redirect } from "react-router-dom";

import { ILazyRouteProps, LazyRoute } from "./LazyRoute";

function PrivateRouteWithoutUser({ user }: { user: undefined | null }) {
  const { loader } = useUIContext().useLoader({});
  switch (user) {
    case undefined:
      return loader;
    case null:
      return <Redirect to="/" />;
  }
}

export function PrivateRoute(props: PropsWithChildren<ILazyRouteProps>): ReactElement {
  const { user } = useIdentityContext();

  if (user) {
    return <LazyRoute {...props} />;
  }

  const renderPrivateRoute = () => <PrivateRouteWithoutUser user={user} />;
  return <LazyRoute {...props} render={renderPrivateRoute} />;
}
