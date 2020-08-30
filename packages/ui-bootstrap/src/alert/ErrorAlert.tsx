import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {
  ErrorAlertComponent as CoreErrorAlertComponent,
  IErrorAlertProps as ICoreErrorAlertProps,
  IUseErrorAlertProps as ICoreUseErrorAlertProps,
  printError,
  useErrorAlert as useCoreErrorAlert,
} from '@reactionable/core/lib/ui/alert/ErrorAlert';
import React from 'react';

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
