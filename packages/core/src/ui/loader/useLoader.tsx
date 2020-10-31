import React, { ReactElement, useState } from 'react';

import { ILoaderProps, Loader, LoaderComponent } from './Loader';

export type IUseLoaderProps = ILoaderProps & {
  isLoading?: boolean;
};

export type IUseLoaderResult = {
  isLoading: boolean;
  loader: ReactElement;
  setLoading: (isLoading: boolean) => void;
};

export type IUseLoader<P extends IUseLoaderProps> = (props: P) => IUseLoaderResult;

export function useLoader<P extends IUseLoaderProps = IUseLoaderProps>(
  { Component, isLoading, ...props }: P & { Component: LoaderComponent } = {
    isLoading: false,
    Component: Loader,
    ...({} as P),
  }
): IUseLoaderResult {
  const [isLoadingState, setLoading] = useState<boolean>(isLoading || false);
  const loader = <>{isLoadingState && <Component {...props} />}</>;
  return {
    loader,
    setLoading,
    isLoading: isLoadingState,
  };
}
