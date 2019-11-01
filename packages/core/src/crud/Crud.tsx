import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from '../nav/route/PrivateRoute';
import { ReadDataComponent } from './read/Read';
import { ListComponent } from './list/List';

export interface ICrudProp<Data> {
    name: string
    listComponent: React.LazyExoticComponent<ListComponent<Data>>;
    readComponent: React.LazyExoticComponent<ReadDataComponent<Data>>;
};


export function Crud<Data>({
    name,
    listComponent,
    readComponent,
}: React.PropsWithChildren<ICrudProp<Data>>) {
    const match = useRouteMatch();
    if(!match){
        return <></>;
    }
    return <>
        <PrivateRoute exact path={match.path} component={listComponent}/>
        <PrivateRoute path={`${match.path}/:${name}Id`} component={readComponent} />
    </>;
};
