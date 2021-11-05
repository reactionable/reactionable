import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import { PropsWithChildren, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { ILazyRouteProps, LazyRoute } from "./LazyRoute";

function PrivateRouteWithoutUser({ user }: { user: undefined | null }) {
  const { loader } = useUIContext().useLoader({});
  switch (user) {
    case undefined:
      return loader;
    case null:
      return <Navigate to="/" />;
  }
}

export function PrivateRoute(props: PropsWithChildren<ILazyRouteProps>): ReactElement {
  const { user } = useIdentityContext();

  if (user === undefined || user === null) {
    return <LazyRoute {...props} element={<PrivateRouteWithoutUser user={user} />} />;
  }
  return <LazyRoute {...props} />;
}
