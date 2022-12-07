import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import Router from "next/router";
import { ComponentType, PropsWithChildren, ReactElement, isValidElement, useEffect } from "react";

export function UnauthorizedComponent(): ReactElement | null {
  const { t } = useTranslation("identity");
  const { errorAlert } = useUIContext().useErrorAlert({
    children: new Error(t("You are not allowed to reach this page") ?? undefined),
  });
  return errorAlert;
}

export type IPrivateRouteProps = {
  redirectTo?: string;
  Component?: ComponentType<unknown>;
};
export function PrivateRoute({
  children,
  redirectTo = "/",
  Component = UnauthorizedComponent,
}: PropsWithChildren<IPrivateRouteProps>): ReactElement | null {
  const { user } = useIdentityContext();

  useEffect(() => {
    if (redirectTo && user === null) {
      Router.push(redirectTo);
    }
  }, [redirectTo, user]);

  if (user === undefined) {
    return null;
  }
  if (user === null) {
    return <Component />;
  }
  if (isValidElement(children)) {
    return children;
  }
  return <>{children}</>;
}
