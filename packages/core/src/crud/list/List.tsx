import * as React from 'react';
import { LoaderComponent } from '../../loader/Loader';
import { IError, IUseErrorAlert } from '../../alert/ErrorAlert';

export interface IListProps<Data> {
    data: Array<Data>;
    noDataAlert: IUseErrorAlert;
    isLoading: boolean;
    error?: IError;
    errorAlert: IUseErrorAlert;
    LoaderComponent: LoaderComponent;
    render: (data: Array<Data>) => React.ReactElement;
};


export type TableComponent = React.FC<{
    rows: Array<React.ReactElement>,
}>;

export type ListComponent<Data = any> = React.FC<IListProps<Data>>;
export const List: ListComponent = ({
    data,
    render,
    isLoading,
    error,
    LoaderComponent,
    errorAlert,
    noDataAlert,
}) => {

    React.useEffect(() => {
        if (!isLoading && error) {
            errorAlert.setError(error);
        }
    }, [error, isLoading]);

    return <>
        {isLoading && <LoaderComponent />}
        {!isLoading && error && errorAlert.errorAlert}
        {!isLoading && !error && !data.length && noDataAlert.errorAlert}
        {!isLoading && !error && !!data.length && render(data)}
    </>;
};