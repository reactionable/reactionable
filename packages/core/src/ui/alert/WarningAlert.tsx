import React from 'react';
import { ComponentType, PropsWithChildren, ReactNode } from 'react';

import { Alert, IAlertProps } from './Alert';
import { useAlert } from './useAlert';

export type IWarningAlertProps = IAlertProps;
export type WarningAlertComponent = ComponentType<IWarningAlertProps>;

export type IUseWarningAlertProps = PropsWithChildren<IWarningAlertProps>;

export interface IUseWarningAlertResult {
  warningAlert: ReactNode;
  setWarningAlert: (alert?: ReactNode) => void;
}

export type IUseWarningAlert<P extends IUseWarningAlertProps> = (
  props?: P
) => IUseWarningAlertResult;

export const WarningAlert: WarningAlertComponent = (props) => {
  return <Alert {...props} />;
};

export function useWarningAlert<P extends IUseWarningAlertProps>(
  props: P & { Component: WarningAlertComponent } = {
    ...({ children: undefined } as P),
    Component: WarningAlert,
  }
) {
  const { alert: warningAlert, setAlert: setWarningAlert } = useAlert<P>(props);
  return { warningAlert, setWarningAlert };
}
