import { useIdentityContext, useTranslation } from "@reactionable/core";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import Router from "next/router";
import React, { PropsWithChildren, ReactElement, isValidElement, useEffect } from "react";

export type IPrivateRouteProps = {
  redirectTo?: string;
};
export function PrivateRoute({
  children,
  redirectTo = "/",
}: PropsWithChildren<IPrivateRouteProps>): ReactElement | null {
  const { user } = useIdentityContext();
  const { t } = useTranslation("identity");
  const { errorAlert } = useUIContext().useErrorAlert({
    children: new Error(t("You are not allowed to reach this page")),
  });

  useEffect(() => {
    if (user === null) {
      Router.push(redirectTo);
    }
  }, [redirectTo, user]);

  if (user === undefined) {
    return null;
  }
  if (user === null) {
    return errorAlert;
  }
  if (isValidElement(children)) {
    return children;
  }
  return <>{children}</>;
}
