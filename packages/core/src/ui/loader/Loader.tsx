import * as React from 'react';
import { useUIContext } from '../UI';

export type ILoaderProps =  { };
export type LoaderComponent = React.FC<ILoaderProps>;

export type IUseLoaderProps = ILoaderProps & {
    isLoading?: boolean;
};

export type IUseLoaderResult = {
    isLoading: boolean;
    loader: React.ReactElement;
    setLoading: (isLoading: boolean) => void;
}

export type IUseLoader<P extends IUseLoaderProps> = (props: P) => IUseLoaderResult;
export function useLoader<P extends IUseLoaderProps>({ Component, isLoading, ...props }: P & { Component: LoaderComponent }): IUseLoaderResult {
    const [isLoadingState, setLoading] = React.useState<boolean>(isLoading || false);
    return {
        loader: <>{isLoadingState && <Component {...props} />}</>,
        setLoading,
        isLoading: isLoadingState,
    };
};

export const lazyLoad = (
    ComponentToLoad: React.LazyExoticComponent<any>,
): React.FC => (props: any) => withSuspense(<ComponentToLoad {...props} />);

export const withSuspense = (
    component: React.ReactElement,
) => {
    const { loader } = useUIContext().useLoader({isLoading: true});
    return <React.Suspense fallback={loader}>{component}</React.Suspense>
};

