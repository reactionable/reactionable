import { useIdentityContext, useTranslation } from "@reactionable/core";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import Router from "next/router";
import React, { PropsWithChildren, ReactElement, useEffect } from "react";

export type IPrivateRouteProps = {
  redirectTo?: string;
};
export function PrivateRoute({
  children,
  redirectTo = "/",
}: PropsWithChildren<IPrivateRouteProps>): ReactElement | null {
  const { user } = useIdentityContext();
  const { t } = useTranslation();
  const { errorAlert } = useUIContext().useErrorAlert({
    children: t("You are not allowed to reach this page"),
  });

  useEffect(() => {
    if (!user) {
      Router.push(redirectTo);
    }
  }, [redirectTo, user]);

  return user ? <>{children}</> : errorAlert;
}
