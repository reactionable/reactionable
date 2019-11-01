import * as React from 'react';
import { IError } from '../../ui/alert/ErrorAlert';
import { IUseLoaderResult } from '../../ui/loader/Loader';
import { useUIContext } from '../../ui/UI';

export type IListProps<Data> = Pick<IUseLoaderResult, 'isLoading'> & {
    data: Array<Data>;
    error?: IError;
    noData?: React.ReactElement;
    render: (data: Array<Data>) => React.ReactElement;
};

export type ListComponent<Data> = React.FC<IListProps<Data>>;
export function List<Data>({
    data,
    render,
    isLoading,
    error,
    noData,
}: React.PropsWithChildren<IListProps<Data>>) {
    const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
    const { loader, setLoading } = useLoader({ isLoading });
    const { errorAlert, setErrorAlert } = useErrorAlert({});
    const { warningAlert, setWarningAlert } = useWarningAlert({});

    React.useEffect(() => {
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