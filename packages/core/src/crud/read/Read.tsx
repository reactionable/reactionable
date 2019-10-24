import * as React from 'react';
import { LoaderComponent } from '../../loader/Loader';
import { ErrorAlertComponent, IError } from '../../alert/ErrorAlert';

export interface IReadProps<Data> {
    loading?: boolean;
    LoaderComponent: LoaderComponent,
    error?: IError;
    ErrorAlertComponent: ErrorAlertComponent;
    data?: Data;
    render: (data: Data) => React.ReactElement;
};

export type ReadDataComponent<Data> = React.FC<{ data: Data }>;

export type ReadComponent<Data = any> = React.FC<IReadProps<Data>>;
export const Read: ReadComponent = ({
    loading, LoaderComponent,
    ErrorAlertComponent,
    error,
    render,
    data,
}) => {
    return <>
        {loading && <LoaderComponent />}
        {!loading && error && <ErrorAlertComponent children={error} />}
        {!loading && !error && render(data)}
    </>;
};