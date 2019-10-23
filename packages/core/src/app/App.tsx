import React, { LazyExoticComponent } from 'react';
import { Router, Route, Switch, RouteProps } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { lazyLoad, LoaderComponent } from '../loader/Loader';
import { IdentityContextProvider, IIdentityContextProviderProps } from '../identity/Identity';
import { PrivateRoute } from '../nav/privacy-route/PrivateRoute';

export interface IAppProps {
    routes: Array<Omit<RouteProps, 'component'> & {
        component: LazyExoticComponent<any>,
        privateRoute?: boolean,
    }>,
    LoaderComponent: LoaderComponent,
    HomeComponent?: LazyExoticComponent<any>,
    NotFoundComponent?: LazyExoticComponent<any>,
    identity?: IIdentityContextProviderProps,
}

export const App: React.FC<IAppProps> = ({
    routes = [],
    LoaderComponent,
    HomeComponent,
    NotFoundComponent,
    identity,
}) => {
    const customHistory = createBrowserHistory();

    if (HomeComponent) {
        routes.unshift({ component: HomeComponent, exact: true, path: '/', privateRoute: false, });
    }
    if (NotFoundComponent) {
        routes.push({ component: NotFoundComponent, privateRoute: false, });
    }

    const router = <Router history={customHistory}>
        <Switch>{routes.map(({ privateRoute, component, ...routeProps }) => {
            const key = `${routeProps.exact ? 'exact' : 'non-exact'}-${routeProps.path}-${privateRoute ? 'private' : 'public'}-${component.name}`;
            if (privateRoute) {
                if (!identity) {
                    throw new Error('Unable to render a private route without identify configuration');
                }
                return <PrivateRoute
                    key={key}
                    component={lazyLoad(component, LoaderComponent)}
                    LoaderComponent={LoaderComponent}
                    {...routeProps}
                />;
            }
            return <Route
                key={key}
                component={lazyLoad(component, LoaderComponent)}
                {...routeProps}
            />;
        })}</Switch>
    </Router>;

    if (!identity) {
        return router;
    }

    return <IdentityContextProvider {...identity}>{router}</IdentityContextProvider>;
};
