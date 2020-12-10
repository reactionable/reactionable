import { ReactElement, useState } from "react";

import { ILoaderProps, Loader, LoaderComponent } from "./Loader";

export type IUseLoaderProps = ILoaderProps & {
  loading?: boolean;
  Component?: LoaderComponent;
};

export type IUseLoaderResult = {
  loading: boolean;
  loader: ReactElement | null;
  setLoading: (loading: boolean) => void;
};

export type IUseLoader<P extends IUseLoaderProps> = (props: P) => IUseLoaderResult;

export function useLoader<UseLoaderProps extends IUseLoaderProps = IUseLoaderProps>(
  { Component, loading, ...props }: UseLoaderProps = {
    loading: false,
    Component: Loader,
  } as UseLoaderProps
): IUseLoaderResult {
  const [loadingState, setLoading] = useState<boolean>(loading || false);
  if (!Component) {
    Component = Loader;
  }

  const loader = loadingState ? <Component {...props} /> : null;
  return {
    loader,
    setLoading,
    loading: loadingState,
  };
}
