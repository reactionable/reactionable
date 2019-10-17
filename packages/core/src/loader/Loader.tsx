import React, { Suspense, useState, LazyExoticComponent, ReactElement } from 'react';

export interface ILoaderProps { };
export type LoaderComponent = React.FC<ILoaderProps>;

export interface IUseLoaderProps extends ILoaderProps {
    Component: LoaderComponent;
};
export interface IUseLoader {
    loader: ReactElement;
    setLoading: (loading: boolean) => void;
    isLoading: boolean;
};

export const useLoader = ({ Component, ...props }: IUseLoaderProps): IUseLoader => {
    const [isLoading, setLoading] = useState<boolean>(false);
    return {
        loader: <>{isLoading && <Component {...props} />}</>,
        setLoading,
        isLoading,
    };
};

export const lazyLoad = (
    ComponentToLoad: LazyExoticComponent<any>,
    LoaderComponent?: LoaderComponent,
) => (props: any) => withSuspense(<ComponentToLoad {...props} />, LoaderComponent);

export const withSuspense = (
    ComponentToLoad: ReactElement,
    LoaderComponent?: LoaderComponent,
) => <Suspense fallback={LoaderComponent || null}>{ComponentToLoad}</Suspense>;

