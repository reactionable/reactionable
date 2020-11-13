import React, { ReactElement, useState } from "react";

import { ILoaderProps, Loader, LoaderComponent } from "./Loader";

export type IUseLoaderProps = ILoaderProps & {
  isLoading?: boolean;
  Component?: LoaderComponent;
};

export type IUseLoaderResult = {
  isLoading: boolean;
  loader: ReactElement | null;
  setLoading: (isLoading: boolean) => void;
};

export type IUseLoader<P extends IUseLoaderProps> = (props: P) => IUseLoaderResult;

export function useLoader<UseLoaderProps extends IUseLoaderProps = IUseLoaderProps>(
  { Component, isLoading, ...props }: UseLoaderProps = {
    isLoading: false,
    Component: Loader,
  } as UseLoaderProps
): IUseLoaderResult {
  const [isLoadingState, setLoading] = useState<boolean>(isLoading || false);
  if (!Component) {
    Component = Loader;
  }

  const loader = isLoadingState ? <Component {...props} /> : null;
  return {
    loader,
    setLoading,
    isLoading: isLoadingState,
  };
}
