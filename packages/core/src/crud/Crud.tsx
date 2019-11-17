import React, { LazyExoticComponent, PropsWithChildren } from 'react';
import { useRouteMatch, Switch } from 'react-router-dom';
import { PrivateRoute } from '../nav/route/PrivateRoute';
import { ReadDataComponent } from './read/Read';
import { ListComponent } from './list/List';

export interface ICrudProp<Data> {
    name: string
    listComponent: LazyExoticComponent<ListComponent<Data>>;
    readComponent: LazyExoticComponent<ReadDataComponent<Data>>;
};

export function Crud<Data>({
    name,
    listComponent,
    readComponent,
}: PropsWithChildren<ICrudProp<Data>>) {
    const match = useRouteMatch();
    if (!match) {
        return <></>;
    }
    return <Switch>
        <PrivateRoute exact path={match.path} component={listComponent} />
        <PrivateRoute path={`${match.path}/:${name}Id`} component={readComponent} />
    </Switch>;
};
