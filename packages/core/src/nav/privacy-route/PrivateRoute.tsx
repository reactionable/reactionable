import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LoaderComponent } from '../../loader/Loader';
import { User, useIdentityContext } from '../../identity/Identity';

type IProps = RouteProps & {
    LoaderComponent: LoaderComponent;
};

const getRender = (
    user: User | null | undefined, 
    LoaderComponent: LoaderComponent,
    Component: any,
) => (props: any): ReactElement => {
    let render;
    switch (user) {
        case undefined:
            render = <LoaderComponent />;
            break;
        case null:
            render = <Redirect to="/" />;
            break;
        default:
            render = <Component {...props} />;
            break;
    }
    return render;
}

export const PrivateRoute: React.FC<IProps> = (props) => {
    const { LoaderComponent, component, ...routeProps } = props;
    const { user } = useIdentityContext();
    return <Route {...routeProps} render={getRender(user, LoaderComponent, component)} />;
};