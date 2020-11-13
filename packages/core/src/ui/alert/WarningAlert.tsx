import React from "react";
import { ComponentType, PropsWithChildren, ReactNode } from "react";

import { Alert, IAlertProps } from "./Alert";
import { useAlert } from "./useAlert";

export type IWarningAlertProps = IAlertProps;
export type WarningAlertComponent = ComponentType<IWarningAlertProps>;

export type IUseWarningAlertProps = PropsWithChildren<IWarningAlertProps> & {
  Component?: WarningAlertComponent;
};

export interface IUseWarningAlertResult {
  warningAlert: ReactNode;
  setWarningAlert: (alert?: ReactNode) => void;
}

export type IUseWarningAlert<UseWarningAlertProps extends IUseWarningAlertProps> = (
  props?: UseWarningAlertProps
) => IUseWarningAlertResult;

export const WarningAlert: WarningAlertComponent = (props) => {
  return <Alert {...props} />;
};

export function useWarningAlert<UseWarningAlertProps extends IUseWarningAlertProps>(
  { Component, ...props }: UseWarningAlertProps = {
    Component: WarningAlert,
  } as UseWarningAlertProps
): IUseWarningAlertResult {
  if (!Component) {
    Component = WarningAlert;
  }
  const { alert: warningAlert, setAlert: setWarningAlert } = useAlert({ Component, ...props });
  return { warningAlert, setWarningAlert };
}
