import { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useAlert, IAlertProps } from './Alert';

export type IWarningAlertProps = IAlertProps;
export type WarningAlertComponent = FC<IWarningAlertProps>;

export type IUseWarningAlertProps = PropsWithChildren<IWarningAlertProps>;

export interface IUseWarningAlertResult {
  warningAlert: ReactElement;
  setWarningAlert: (alert?: ReactNode) => void;
}

export type IUseWarningAlert<P extends IUseWarningAlertProps> = (
  props: P
) => IUseWarningAlertResult;
export function useWarningAlert<P extends IUseWarningAlertProps>(
  props: P & { Component: WarningAlertComponent }
) {
  const { alert: warningAlert, setAlert: setWarningAlert } = useAlert<P>(props);
  return { warningAlert, setWarningAlert };
}
