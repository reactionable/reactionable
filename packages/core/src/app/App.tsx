import * as React from 'react';
import { Router, Switch, RouteProps } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { IUseLoaderProps } from '../ui/loader/Loader';
import { IdentityContextProvider, IIdentityContextProviderProps, IUser } from '../identity/Identity';
import { LazyRoute } from '../nav/route/LazyRoute';
import { PrivateRoute } from '../nav/route/PrivateRoute';
import { IUIContextProviderProps, UIContextProvider } from '../ui/UI';
import { IUseSuccessNotificationProps } from '../ui/notification/SuccessNotification';
import { IUseErrorNotificationProps } from '../ui/notification/ErrorNotification';
import { IUseWarningAlertProps } from '../ui/alert/WarningAlert';
import { IUseErrorAlertProps } from '../ui/alert/ErrorAlert';
import { IUseConfirmationProps } from '../ui/confirmation/Confirmation';

export interface IAppProps<
    User extends IUser,
    L extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    C extends IUseConfirmationProps,
    > {
    routes: Array<Omit<RouteProps, 'component'> & {
        component: React.LazyExoticComponent<any>;
        privateRoute?: boolean;
    }>,
    HomeComponent?: React.LazyExoticComponent<any>;
    NotFoundComponent?: React.LazyExoticComponent<any>;
    identity?: IIdentityContextProviderProps<User>;
    ui?: IUIContextProviderProps<L, SN, EN, EA, WA, C>;
}


export function App<
    User extends IUser,
    L extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    C extends IUseConfirmationProps,
    >({
        routes = [],
        HomeComponent,
        NotFoundComponent,
        identity,
        ui,
    }: React.PropsWithChildren<IAppProps<User, L, SN, EN, EA, WA, C>>) {
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
                    {...routeProps}
                />;
            }
            return <LazyRoute
                key={key}
                component={component}
                {...routeProps}
            />;
        })}</Switch>
    </Router>;

    if (identity) {
        content = <IdentityContextProvider<User> {...identity}>{content}</IdentityContextProvider>;
    }

    if (ui) {
        content = <UIContextProvider<L, SN, EN, EA, WA, C> {...ui}>{content}</UIContextProvider>;
    }

    return content;
};
