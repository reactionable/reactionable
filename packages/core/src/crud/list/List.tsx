import React, { ReactElement, FC, PropsWithChildren, useEffect } from 'react';
import { IError } from '../../error/IError';
import { IUseLoaderResult } from '../../ui/loader/Loader';
import { useUIContext } from '../../ui/UI';

export type IListProps<Data> = Pick<IUseLoaderResult, 'isLoading'> & {
    data: Array<Data>;
    error?: IError;
    noData?: ReactElement;
    render: (data: Array<Data>) => ReactElement;
};

export type ListComponent<Data> = FC<IListProps<Data>>;
export function List<Data>({
    data,
    render,
    isLoading,
    error,
    noData,
}: PropsWithChildren<IListProps<Data>>) {
    const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
    const { loader, setLoading } = useLoader({ isLoading });
    const { errorAlert, setErrorAlert } = useErrorAlert({});
    const { warningAlert, setWarningAlert } = useWarningAlert({});

    useEffect(() => {
        setLoading(isLoading);
        setErrorAlert(!isLoading && error ? error : undefined);
        if (noData) {
            setWarningAlert(!isLoading && !error && (!data || !data.length) ? noData : undefined);
        }
    }, [isLoading, error, data]);

    return <>
        {loader}
        {errorAlert}
        {warningAlert}
        {!isLoading && !error && !!data.length && render(data)}
    </>;
};