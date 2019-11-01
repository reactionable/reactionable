import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IUser, useIdentityContext } from '../../identity/Identity';
import { useUIContext } from '../../ui/UI';
import { lazyLoad } from '../../ui/loader/Loader';

function getRender<User extends IUser>(
    user: User | null | undefined,
    component: React.LazyExoticComponent<any>,
) {
    return (props: any): React.ReactElement => {

        const { loader } = useUIContext().useLoader({});

        let render;
        switch (user) {
            case undefined:
                render = loader;
                break;
            case null:
                render = <Redirect to="/" />;
                break;
            default:
                const Component = lazyLoad(component);
                render = <Component {...props} />;
                break;
        }
        return render;
    };
}

export type IPrivateRouteProps = Omit<RouteProps, 'component'> & {
    component: React.LazyExoticComponent<any>;
};

export function PrivateRoute<User extends IUser>(props: React.PropsWithChildren<IPrivateRouteProps>) {
    const { component, ...routeProps } = props;
    const { user } = useIdentityContext<User>();
    return <Route {...routeProps} render={getRender<User>(user, component)} />;
};