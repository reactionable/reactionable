import React, { FC, PropsWithChildren, ReactElement, ReactNode, useState } from 'react';

export type IAlertProps = {};

export type AlertComponent = FC<IAlertProps>;

export const Alert: AlertComponent = ({ children }) => {
  return <div>{children}</div>;
};

export type IUseAlertProps = PropsWithChildren<IAlertProps>;

export interface IUseAlertResult {
  alert: ReactElement;
  setAlert: (alert?: ReactNode) => void;
}

export type IUseAlert<P extends IUseAlertProps> = (props: P) => IUseAlertResult;
export function useAlert<P extends IUseAlertProps>({
  Component,
  ...props
}: P & { Component: AlertComponent }): IUseAlertResult {
  const [alert, setAlert] = useState<ReactNode | undefined>(
    props.children ? props.children : undefined
  );
  return {
    alert: <>{alert && <Component {...props} children={alert} />}</>,
    setAlert: (alert?: ReactNode) => {
      setAlert(alert);
    },
  };
}
