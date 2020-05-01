import React, { ReactElement, useEffect } from 'react';
import { IUseLoaderResult } from '../../ui/loader/Loader';
import { IUseWarningAlertResult } from '../../ui/alert/WarningAlert';
import { IUseErrorAlertResult } from '../../ui/alert/ErrorAlert';
import { useUIContext } from '../../ui/UI';
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

export function QueryWrapper<
  Data extends {},
  UQR extends IUseQueryResult<Data> = IUseQueryResult<Data>
>({ children, data, ...props }: IQueryWrapperProps<UQR>) {
  const { isLoading, error, noData } = props;
  const { useLoader, useErrorAlert, useWarningAlert } = useUIContext();
  const { loader, setLoading } = useLoader({ isLoading });
  const { warningAlert, setWarningAlert } = useWarningAlert({});
  const { errorAlert, setErrorAlert } = useErrorAlert({});

  const checkHasData = (data: UQR['data']) => data && (!Array.isArray(data) || data.length > 0);

  useEffect(() => {
    setLoading(isLoading);
    setErrorAlert(!isLoading && error ? error : undefined);

    const hasData = checkHasData(data);
    if (error || isLoading || !noData || hasData) {
      return;
    }

    setWarningAlert(hasData ? undefined : noData);
  }, [isLoading, error, data]);

  const hasData = checkHasData(data);

  return (
    <>
      {loader}
      {errorAlert}
      {warningAlert}
      {!isLoading &&
        !error &&
        hasData &&
        children({
          data: data as DataPropsType<UQR>,
          setLoading,
          setErrorAlert,
          setWarningAlert,
          ...props,
        } as IQueryWrapperChildrenProps<UQR>)}
    </>
  );
}
