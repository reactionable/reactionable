import { PropsWithChildren, ReactElement, ReactNode, useState } from "react";

import { Alert, AlertComponent, IAlertProps } from "./Alert";

export type IUseAlertProps = PropsWithChildren<IAlertProps>;

export interface IUseAlertResult {
  alert: ReactElement | null;
  setAlert: (alert?: ReactNode) => void;
}

export type IUseAlert<P extends IUseAlertProps> = (props: P) => IUseAlertResult;

export function useAlert<P extends IUseAlertProps = IUseAlertProps>(
  { Component, ...props }: P & { Component: AlertComponent } = {
    ...({ children: undefined } as P),
    Component: Alert,
  }
): IUseAlertResult {
  const [alert, setAlert] = useState<ReactNode | undefined>(
    props.children ? props.children : undefined
  );

  return {
    alert: alert ? <Component {...props}>{alert}</Component> : null,
    setAlert: (alert?: ReactNode) => {
      setAlert(alert);
    },
  };
}
