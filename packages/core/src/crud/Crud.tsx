import React, { LazyExoticComponent } from 'react';
import { lazyLoad, LoaderComponent } from '../loader/Loader';
import { INavProps } from '../nav/INavProps';
import { PrivateRoute } from '../nav/privacy-route/PrivateRoute';

export interface ICrudProps<Match> extends INavProps<Match> {
    name: string
    ListComponent: LazyExoticComponent<React.FC<INavProps<Match>>>;
    ReadComponent: LazyExoticComponent<React.FC<INavProps<Match>>>;
    LoaderComponent: LoaderComponent;
};

export type NavComponent<Match = any> = React.FC<ICrudProps<Match>>;

export const Crud: NavComponent = ({
    match,
    name,
    ListComponent,
    ReadComponent,
    LoaderComponent
}) => {
    return <>
        <PrivateRoute exact path={match.path} Component={lazyLoad(ListComponent)} LoaderComponent={LoaderComponent}/>
        <PrivateRoute path={`${match.path}/:${name}Id`} Component={lazyLoad(ReadComponent)} LoaderComponent={LoaderComponent} />
    </>;
};
