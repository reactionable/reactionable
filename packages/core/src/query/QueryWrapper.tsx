import React, { ReactElement, useEffect, useState } from 'react';
import { IUseLoaderResult } from '../ui/loader/Loader';
import { IUseWarningAlertResult } from '../ui/alert/WarningAlert';
import { IUseErrorAlertResult } from '../ui/alert/ErrorAlert';
import { useUIContext } from '../ui/UI';
import { IUseQueryResult } from './Query';

export type IQueryWrapperProps<UQR extends IUseQueryResult<any> = IUseQueryResult<any>> = Pick<
  UQR,
  'isLoading' | 'error' | 'data'
> & {
  noData?: ReactElement;
  children: (props: IQueryWrapperChildrenProps<UQR>) => ReactElement;
};

export type IQueryWrapperChildrenProps<UQR extends IUseQueryResult<any>> = Omit<UQR, 'data'> & {
  data: DataPropsType<UQR>;
} & Pick<IUseLoaderResult, 'setLoading'> &
  Pick<IUseErrorAlertResult, 'setErrorAlert'> &
  Pick<IUseWarningAlertResult, 'setWarningAlert'>;

type DataPropsType<UQR extends IUseQueryResult<any>> = UQR extends IUseQueryResult<infer Data>
  ? Data extends {}
    ? Data
    : never
  : never;

function checkHasData(data: any) {
  if (Array.isArray(data)) {
    return data.length > 0;
  }

  if (typeof data === 'object') {
    return Object.keys(data).length > 0;
  }

  return data !== null && data != undefined;
}

export function QueryWrapper<
  Data extends {},
  UQR extends IUseQueryResult<Data> = IUseQueryResult<Data>
>({ children, data, ...props }: IQueryWrapperProps<UQR>) {
  const { isLoading, error, noData } = props;
  const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
  const { loader, setLoading } = useLoader({ isLoading });
  const { warningAlert, setWarningAlert } = useWarningAlert({});
  const { errorAlert, setErrorAlert } = useErrorAlert({});
  const [childrenData, setData] = useState<DataPropsType<UQR>>();

  useEffect(() => {
    setLoading(isLoading);
    setErrorAlert(!isLoading && error ? error : undefined);

    const hasData = checkHasData(data);

    setData(!isLoading && !error && hasData ? (data as DataPropsType<UQR>) : undefined);

    if (error || isLoading || !noData || hasData) {
      return;
    }

    setWarningAlert(hasData ? undefined : noData);
  }, [isLoading, error, data]);

  return (
    <>
      {loader}
      {errorAlert}
      {warningAlert}
      {childrenData &&
        children({
          data: childrenData,
          setLoading,
          setErrorAlert,
          setWarningAlert,
          ...props,
        } as IQueryWrapperChildrenProps<UQR>)}
    </>
  );
}
