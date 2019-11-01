import * as React from 'react';
import { IError } from '../../ui/alert/ErrorAlert';
import { useUIContext } from '../../ui/UI';
import { IUseLoaderResult } from '../../ui/loader/Loader';

export type IReadProps<Data> = Pick<IUseLoaderResult, 'isLoading'> & {
    error?: IError;
    data?: Data;
    noData?: React.ReactElement;
    render: (data: Data) => React.ReactElement;
};

export type ReadDataComponent<Data> = React.FC<{ data: Data }>;

export type ReadComponent<Data> = React.FC<IReadProps<Data>>;
export function Read<Data>({
    isLoading,
    error,
    render,
    data,
    noData,
}: React.PropsWithChildren<IReadProps<Data>>) {
    const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
    const { loader, setLoading } = useLoader({ isLoading });
    const { errorAlert, setErrorAlert } = useErrorAlert({});
    const { warningAlert, setWarningAlert } = useWarningAlert({});

    React.useEffect(() => {
        setLoading(isLoading);
        setErrorAlert(!isLoading && error ? error : undefined);
        if (noData) {
            setWarningAlert(!isLoading && !error && !data ? noData : undefined);
        }
    }, [isLoading, error, data]);

    return <>
        {loader}
        {errorAlert}
        {warningAlert}
        {!isLoading && !error && !!data && render(data)}
    </>;
};