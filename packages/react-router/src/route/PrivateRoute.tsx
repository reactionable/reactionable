import { useIdentityContext, useUIContext } from "@reactionable/core";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router";

function PrivateRouteWithoutUser({ user }: { user: undefined | null }) {
  const { loader } = useUIContext().useLoader({});
  switch (user) {
    case undefined:
      return loader;
    case null:
      return <Navigate to="/" />;
  }
}

export function PrivateRoute(): ReactElement {
  const { user } = useIdentityContext();

  if (user === undefined || user === null) {
    return <PrivateRouteWithoutUser user={user} />;
  }

  return <Outlet />;
}
