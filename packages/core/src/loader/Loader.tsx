import * as React from 'react';

export interface ILoaderProps { };
export type LoaderComponent = React.FC<ILoaderProps>;

export interface IUseLoaderProps extends ILoaderProps {
    Component: LoaderComponent;
};
export interface IUseLoader {
    loader: React.ReactElement;
    setLoading: (loading: boolean) => void;
    isLoading: boolean;
};

export const useLoader = ({ Component, ...props }: IUseLoaderProps): IUseLoader => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    return {
        loader: <>{isLoading && <Component {...props} />}</>,
        setLoading,
        isLoading,
    };
};

export const lazyLoad = (
    ComponentToLoad: React.LazyExoticComponent<any>,
    LoaderComponent?: LoaderComponent,
) => (props: any) => withSuspense(<ComponentToLoad {...props} />, LoaderComponent);

export const withSuspense = (
    ComponentToLoad: React.ReactElement,
    LoaderComponent?: LoaderComponent,
) => <React.Suspense fallback={LoaderComponent || null}>{ComponentToLoad}</React.Suspense>;

