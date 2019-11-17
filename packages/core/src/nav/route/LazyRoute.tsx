import React, { LazyExoticComponent, ReactNode, ReactElement, PropsWithChildren } from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import { lazyLoad } from '../../ui/loader/Loader';
import { useUIContext } from '../../ui/UI';
import { IUseLayoutProps } from '../../ui/layout/Layout';

export type ILazyRouteComponentProps<LP extends IUseLayoutProps> = Omit<RouteProps, 'component'> & {
    component: LazyExoticComponent<any>;
    layout?: LP;
};

export type ILazyRouteProps<LP extends IUseLayoutProps> = Omit<ILazyRouteComponentProps<LP>, 'component'> & {
    component?: LazyExoticComponent<any>;
    render?: ((props: RouteComponentProps<any>) => ReactNode);
};

export function renderLazyRoute<LP extends IUseLayoutProps>({ layout, component, render }: {
    layout?: LP;
    component?: LazyExoticComponent<any>;
    render?: ((props: RouteComponentProps<any>) => ReactNode);
}) {
    const { useLayout } = useUIContext();
    return (props: any): ReactElement => {
        let rendered: ReactNode;
        if (component) {
            const Component = lazyLoad(component);
            rendered = <Component {...props} />;
        }
        else if (render) {
            rendered = render(props);
        }

        if (!layout) {
            return <>{rendered}</>;
        }

        return useLayout({
            children: rendered,
            ...layout
        });
    };
};

export function LazyRoute<LP extends IUseLayoutProps>({ component, render, layout, ...routeProps }: PropsWithChildren<ILazyRouteProps<LP>>) {
    return <Route {...routeProps} render={renderLazyRoute({
        layout,
        component,
        render,
    })} />;
};