import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {
  printError,
  IErrorAlertProps as ICoreErrorAlertProps,
  useErrorAlert as useCoreErrorAlert,
  IUseErrorAlertProps as ICoreUseErrorAlertProps,
  ErrorAlertComponent as CoreErrorAlertComponent,
} from '@reactionable/core';
import { Alert, IAlertProps } from './Alert';

export type IErrorAlertProps = ICoreErrorAlertProps<IAlertProps>;
export type ErrorAlertComponent = CoreErrorAlertComponent<IErrorAlertProps>;
export const ErrorAlert: ErrorAlertComponent = ({ children, ...props }) => {
  return (
    <Alert
      variant="danger"
      icon={{ icon: faExclamationTriangle }}
      children={printError(children)}
      {...props}
    />
  );
};

export type IUseErrorAlertProps = ICoreUseErrorAlertProps & IAlertProps;
export const useErrorAlert = (props?: IUseErrorAlertProps) => {
  return useCoreErrorAlert<IUseErrorAlertProps>({
    Component: ErrorAlert,
    ...props,
  });
};
