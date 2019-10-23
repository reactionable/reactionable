import React, { ReactNode, ReactElement } from 'react';
import { LoaderComponent } from '../../loader/Loader';
import { ErrorAlertComponent, IError } from '../../error-alert/ErrorAlert';

export interface IListProps<Data> {
    data: Array<Data>;
    noData?: ReactNode;
    isLoading: boolean;
    error?: IError;
    LoaderComponent: LoaderComponent;
    ErrorAlertComponent: ErrorAlertComponent;
    render: (data: Array<Data>) => React.ReactElement;
};


export type TableComponent = React.FC<{
    rows: Array<ReactElement>,
}>;

export type ListComponent<Data = any> = React.FC<IListProps<Data>>;
export const List: ListComponent = ({
    data,
    noData,
    render,
    isLoading,
    error,
    LoaderComponent,
    ErrorAlertComponent,
}) => {
    return <>
        {isLoading && <LoaderComponent />}
        {!isLoading && error && <ErrorAlertComponent children={error} />}
        {!isLoading && !error && !data.length && noData && <ErrorAlertComponent children={noData} />}
        {!isLoading && !error && !!data.length && render(data)}
    </>;
};