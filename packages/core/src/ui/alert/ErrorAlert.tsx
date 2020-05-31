import React, { PropsWithChildren, ReactElement, useState, ReactNode } from 'react';
import { IAlertProps, Alert } from './Alert';
import { IError } from '../../error/IError';

export function isIError(arg: any): arg is IError {
  return arg.name !== undefined && arg.message !== undefined;
}

export type IErrorAlertProps<AlertProps extends IAlertProps = IAlertProps> = AlertProps;

export type ErrorAlertComponent<AlertProps extends IAlertProps = IAlertProps> = (
  props: IUseErrorAlertProps<AlertProps>,
  context?: any
) => ReactElement<any, any>;

export function printError(error?: IError): ReactNode {
  return error ? error.message : <></>;
}

export const ErrorAlert: ErrorAlertComponent = ({ children, ...props }) => {
  return <Alert {...props} children={printError(children)} />;
};

export type IUseErrorAlertProps<AlertProps extends IAlertProps = IAlertProps> = Omit<
  PropsWithChildren<AlertProps>,
  'children'
> & {
  children?: IError;
};

export interface IUseErrorAlertResult {
  errorAlert: ReactElement;
  setErrorAlert: (alert?: IError) => void;
}

export type IUseErrorAlert<P extends IUseErrorAlertProps> = (props?: P) => IUseErrorAlertResult;
export function useErrorAlert<P extends IUseErrorAlertProps>(
  { Component, ...props }: P & { Component: ErrorAlertComponent } = {
    ...({ children: undefined } as P),
    Component: ErrorAlert,
  }
): IUseErrorAlertResult {
  const [errorAlert, setErrorAlert] = useState<IError | undefined>(
    props.children ? props.children : undefined
  );
  return {
    errorAlert: <>{errorAlert && <Component {...props} children={errorAlert} />}</>,
    setErrorAlert: (alert?: IError) => {
      setErrorAlert(alert);
    },
  };
}
