import React, { ReactElement, FC, PropsWithChildren, useEffect } from 'react';
import { IError } from '../../error/IError';
import { useUIContext } from '../../ui/UI';
import { IUseLoaderResult } from '../../ui/loader/Loader';

export type IReadProps<Data> = Pick<IUseLoaderResult, 'isLoading'> & {
    error?: IError;
    data?: Data;
    noData?: ReactElement;
    render: (data: Data) => ReactElement;
};

export type ReadDataComponent<Data> = FC<{ data: Data }>;

export type ReadComponent<Data> = FC<IReadProps<Data>>;
export function Read<Data>({
    isLoading,
    error,
    render,
    data,
    noData,
}: PropsWithChildren<IReadProps<Data>>) {
    const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
    const { loader, setLoading } = useLoader({ isLoading });
    const { errorAlert, setErrorAlert } = useErrorAlert({});
    const { warningAlert, setWarningAlert } = useWarningAlert({});

    useEffect(() => {
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