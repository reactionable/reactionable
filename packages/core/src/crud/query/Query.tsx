import { IError } from '../../error/IError';
import React, { useEffect, ReactElement } from 'react';
import { useUIContext } from '../../ui/UI';

export interface IUseQueryResult<Data> {
    isLoading: boolean;
    error?: IError;
    data?: Data;
    refetch: () => void;
};

export interface IUseQueryOptions<Variables extends {} = {}> {
    variables?: Variables;
};

export type IUseQuery<Data extends {}, Options extends IUseQueryOptions = {}> = (
    options?: Options
) => IUseQueryResult<Data>;


export type IQueryWrapperProps<Data, UQR extends IUseQueryResult<Data> = IUseQueryResult<Data>> = UQR & {
    noData?: ReactElement;
    children: (props: UQR) => ReactElement;
};

export function QueryWrapper<Data, UQR extends IUseQueryResult<Data> = IUseQueryResult<Data>>({ children, ...props }: IQueryWrapperProps<Data, UQR>) {

    const { isLoading, error, data, noData } = props;
    const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
    const { loader, setLoading } = useLoader({ isLoading });
    const { warningAlert, setWarningAlert } = useWarningAlert({});
    const { errorAlert, setErrorAlert } = useErrorAlert({});

    useEffect(() => {
        setLoading(isLoading);
        setErrorAlert(!isLoading && error ? error : undefined);
        if (error || isLoading || !noData || data) {
            return;
        }
        setWarningAlert(
            !data
                || (Array.isArray(data) && !data.length)
                ? noData
                : undefined
        );
    }, [isLoading, error, data]);

    return <>
        {loader}
        {errorAlert}
        {warningAlert}
        {!isLoading && !error && children(props as UQR)}
    </>;
}