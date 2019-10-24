import * as React from 'react';
import { LoaderComponent } from '../../loader/Loader';
import { IError, IUseErrorAlert } from '../../alert/ErrorAlert';

export interface IReadProps<Data> {
    isLoading?: boolean;
    LoaderComponent: LoaderComponent,
    error?: IError;
    errorAlert: IUseErrorAlert;
    data?: Data;
    render: (data: Data) => React.ReactElement;
};

export type ReadDataComponent<Data> = React.FC<{ data: Data }>;

export type ReadComponent<Data = any> = React.FC<IReadProps<Data>>;
export const Read: ReadComponent = ({
    isLoading,
    LoaderComponent,
    error,
    errorAlert,
    render,
    data,
}) => {

    React.useEffect(() => {
        errorAlert.setErrorAlert(!isLoading && error ? error : undefined);
    }, [error, isLoading]);

    return <>
        {isLoading && <LoaderComponent />}
        {!isLoading && error && errorAlert.errorAlert}
        {!isLoading && !error && render(data)}
    </>;
};