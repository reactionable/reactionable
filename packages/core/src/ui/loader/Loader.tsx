import React, { FC, ReactElement, useState, LazyExoticComponent, Suspense } from 'react';
import { useUIContext } from '../UI';

export type ILoaderProps = {};
export type LoaderComponent = FC<ILoaderProps>;

export type IUseLoaderProps = ILoaderProps & {
    isLoading?: boolean;
};

export type IUseLoaderResult = {
    isLoading: boolean;
    loader: ReactElement;
    setLoading: (isLoading: boolean) => void;
};

export type IUseLoader<P extends IUseLoaderProps> = (props: P) => IUseLoaderResult;

export function useLoader<P extends IUseLoaderProps>({ Component, isLoading, ...props }: P & { Component: LoaderComponent }): IUseLoaderResult {
    const [isLoadingState, setLoading] = useState<boolean>(isLoading || false);
    return {
        loader: <>{isLoadingState && <Component {...props} />}</>,
        setLoading,
        isLoading: isLoadingState,
    };
};

export const lazyLoad = (
    ComponentToLoad: LazyExoticComponent<any>,
): FC => (props: any) => withSuspense(<ComponentToLoad {...props} />);

export const withSuspense = (
    component: ReactElement,
) => {
    const { loader } = useUIContext().useLoader({ isLoading: true });
    return <Suspense fallback={loader}>{component}</Suspense>
};