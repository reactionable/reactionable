import * as React from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import { lazyLoad } from '../../ui/loader/Loader';
import { useUIContext } from '../../ui/UI';
import { IUseLayoutProps } from '../../ui/layout/Layout';


export type ILazyRouteComponentProps<LP extends IUseLayoutProps> = Omit<RouteProps, 'component'> & {
    component: React.LazyExoticComponent<any>;
    layout?: LP;
}


export type ILazyRouteProps<LP extends IUseLayoutProps> = Omit<ILazyRouteComponentProps<LP>, 'component'> & {
    component?: React.LazyExoticComponent<any>;
    render?: ((props: RouteComponentProps<any>) => React.ReactNode);
};

export function renderLazyRoute<LP extends IUseLayoutProps>({ layout, component, render }: {
    layout?: LP;
    component?: React.LazyExoticComponent<any>;
    render?: ((props: RouteComponentProps<any>) => React.ReactNode);
}) {
    const { useLayout } = useUIContext();
    return (props: any): React.ReactElement => {
        let rendered: React.ReactNode;
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

export function LazyRoute<LP extends IUseLayoutProps>({ component, render, layout, ...routeProps }: React.PropsWithChildren<ILazyRouteProps<LP>>) {
    return <Route {...routeProps} render={renderLazyRoute({
        layout,
        component,
        render,
    })} />;
};