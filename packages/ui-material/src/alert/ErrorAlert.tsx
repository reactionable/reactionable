import {
  printError,
  ErrorAlertComponent as CoreErrorAlertComponent,
  IErrorAlertProps as ICoreErrorAlertProps,
  IUseErrorAlertProps as ICoreUseErrorAlertProps,
  IUseErrorAlertResult,
  useErrorAlert as useCoreErrorAlert,
} from "@reactionable/core";

import { Alert, IAlertProps } from "./Alert";

export type IErrorAlertProps = ICoreErrorAlertProps<IAlertProps>;
export type ErrorAlertComponent = CoreErrorAlertComponent<IErrorAlertProps>;
export const ErrorAlert: ErrorAlertComponent = ({
  children,
  error,
  ...props
}: IErrorAlertProps) => {
  return (
    <Alert severity="error" {...props}>
      {error ? printError(error) : children}
    </Alert>
  );
};

export type IUseErrorAlertProps = ICoreUseErrorAlertProps;
export const useErrorAlert = (props?: IUseErrorAlertProps): IUseErrorAlertResult => {
  return useCoreErrorAlert<IUseErrorAlertProps>({
    Component: ErrorAlert,
    ...props,
  });
};
