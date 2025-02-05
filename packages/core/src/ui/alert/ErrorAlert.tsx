import { ComponentType, ReactElement, useState } from "react";

import { IError, printError } from "../../error/IError";
import { Alert, IAlertProps } from "./Alert";

export type IErrorAlertProps<AlertProps extends IAlertProps = IAlertProps> = AlertProps & {
  error?: IError;
};

export type ErrorAlertComponent<ErrorAlertProps extends IErrorAlertProps = IErrorAlertProps> =
  ComponentType<ErrorAlertProps>;

export function ErrorAlert<AlertProps extends IAlertProps = IAlertProps>({
  children,
  error,
  ...props
}: IErrorAlertProps<AlertProps>): ReactElement {
  return <Alert {...props}>{error ? printError(error) : children}</Alert>;
}

export type IUseErrorAlertProps<ErrorAlertProps extends IErrorAlertProps = IErrorAlertProps> =
  ErrorAlertProps & {
    Component?: ErrorAlertComponent;
  };

export interface IUseErrorAlertResult {
  errorAlert: ReactElement | null;
  setErrorAlert: (alert?: IError) => void;
}

export type IUseErrorAlert<UseErrorAlertProps extends IUseErrorAlertProps> = (
  props?: UseErrorAlertProps
) => IUseErrorAlertResult;

export function useErrorAlert<UseErrorAlertProps extends IUseErrorAlertProps>(
  { Component, ...props }: UseErrorAlertProps = { Component: ErrorAlert } as UseErrorAlertProps
): IUseErrorAlertResult {
  const error = props.error || undefined;
  const [errorAlert, setErrorAlert] = useState<IError | undefined>(error);
  if (!Component) {
    Component = ErrorAlert;
  }

  return {
    errorAlert: errorAlert ? <Component {...props} error={errorAlert} /> : null,
    setErrorAlert,
  };
}
