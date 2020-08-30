import React, { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

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
