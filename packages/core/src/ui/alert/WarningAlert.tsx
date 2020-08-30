import { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

import { Alert, IAlertProps } from './Alert';
import { useAlert } from './useAlert';

export type IWarningAlertProps = IAlertProps;
export type WarningAlertComponent = FC<IWarningAlertProps>;

export type IUseWarningAlertProps = PropsWithChildren<IWarningAlertProps>;

export interface IUseWarningAlertResult {
  warningAlert: ReactElement;
  setWarningAlert: (alert?: ReactNode) => void;
}

export type IUseWarningAlert<P extends IUseWarningAlertProps> = (
  props?: P
) => IUseWarningAlertResult;

export function useWarningAlert<P extends IUseWarningAlertProps>(
  props: P & { Component: WarningAlertComponent } = {
    ...({ children: undefined } as P),
    Component: Alert,
  }
) {
  const { alert: warningAlert, setAlert: setWarningAlert } = useAlert<P>(props);
  return { warningAlert, setWarningAlert };
}
