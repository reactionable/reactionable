import { lazyLoad } from "@reactionable/core/lib/ui/loader/Loader";
import { ComponentType, LazyExoticComponent, PropsWithChildren, ReactElement } from "react";
import { Redirect, RouteComponentProps, useLocation, withRouter } from "react-router-dom";

export const RouteNotFound = (): ReactElement => (
  <Redirect to={{ state: { notFoundError: true } }} />
);

function CaptureRouteNotFound({
  notFoundComponent,
  children,
}: PropsWithChildren<{
  notFoundComponent: LazyExoticComponent<ComponentType>;
}>): ReactElement | null {
  const location = useLocation<{ notFoundError: boolean }>();

  const shouldDisplayNotFoundComponent = location && location.state && location.state.notFoundError;
  if (shouldDisplayNotFoundComponent) {
    const NotFoundComponent = lazyLoad(notFoundComponent);
    return <NotFoundComponent />;
  }
  if (children) {
    return <>{children}</>;
  }

  return null;
}

export const useCaptureRouteNotFound = (
  notFoundComponent: LazyExoticComponent<ComponentType>
): ReturnType<typeof withRouter> =>
  withRouter(({ children }: PropsWithChildren<RouteComponentProps>) => (
    <CaptureRouteNotFound notFoundComponent={notFoundComponent}>{children}</CaptureRouteNotFound>
  ));
