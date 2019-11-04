import * as React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IdentityContextProvider, IIdentityContextProviderProps } from '../identity/Identity';
import { LazyRoute, ILazyRouteComponentProps } from '../nav/route/LazyRoute';
import { PrivateRoute } from '../nav/route/PrivateRoute';
import { IUIContextProviderProps, UIContextProvider } from '../ui/UI';
import { IUseLayoutProps } from '../ui/layout/Layout';

export interface IAppProps<
    ICP extends IIdentityContextProviderProps,
    UICP extends IUIContextProviderProps,
    LP extends IUseLayoutProps,
    > {
    routes: Array<ILazyRouteComponentProps<LP> & { privateRoute?: boolean }>,
    HomeComponent?: React.LazyExoticComponent<any>;
    NotFoundComponent?: React.LazyExoticComponent<any>;
    identity?: ICP;
    ui?: UICP;
    layout?:LP;
};

export function App<
    ICP extends IIdentityContextProviderProps = IIdentityContextProviderProps,
    UICP extends IUIContextProviderProps = IUIContextProviderProps,
    LP extends IUseLayoutProps = IUseLayoutProps
>({
    routes = [],
    HomeComponent,
    NotFoundComponent,
    identity,
    ui,
    layout,
}: React.PropsWithChildren<IAppProps<ICP, UICP, LP>>) {
    const customHistory = createBrowserHistory();

    if (HomeComponent) {
        routes.unshift({ component: HomeComponent, exact: true, path: '/', privateRoute: false, });
    }
    if (NotFoundComponent) {
        routes.push({ component: NotFoundComponent, privateRoute: false, });
    }

    let content = <Router history={customHistory}>
        <Switch>{routes.map(({ privateRoute, component, ...routeProps }) => {
            const key = `${routeProps.exact ? 'exact' : 'non-exact'}-${routeProps.path}-${privateRoute ? 'private' : 'public'}-${component.name}`;
            if (privateRoute) {
                if (!identity) {
                    throw new Error('Unable to render a private route without identify configuration');
                }
                return <PrivateRoute
                    key={key}
                    component={component}
                    layout={layout}
                    {...routeProps}
                />;
            }
            return <LazyRoute
                key={key}
                component={component}
                layout={layout}
                {...routeProps}
            />;
        })}</Switch>
    </Router>;

    if (identity) {
        content = <IdentityContextProvider {...identity}>{content}</IdentityContextProvider>;
    }

    if (ui) {
        content = <UIContextProvider {...ui}>{content}</UIContextProvider>;
    }

    return <React.StrictMode>{content}</React.StrictMode>;
};
