import { lazyLoad } from "@reactionable/core/lib/ui/loader/Loader";
import { ComponentType, LazyExoticComponent, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export type INotFoundComponent = LazyExoticComponent<ComponentType<unknown>>;

export const useCaptureRouteNotFound = (
  notFoundComponent: INotFoundComponent
): ComponentType<PropsWithChildren<unknown>> =>
  function CaptureRouteNotFound({ children }: PropsWithChildren<unknown>) {
    const location = useLocation();

    const shouldDisplayNotFoundComponent =
      location && location.state && (location.state as { notFoundError?: string }).notFoundError;
    if (shouldDisplayNotFoundComponent) {
      const NotFoundComponent = lazyLoad(notFoundComponent);
      return <NotFoundComponent />;
    }
    if (children) {
      return <>{children}</>;
    }

    return null;
  };
