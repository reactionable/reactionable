import { printError } from "@reactionable/core/lib/error/IError";
import {
  ErrorAlertComponent as CoreErrorAlertComponent,
  IErrorAlertProps as ICoreErrorAlertProps,
  IUseErrorAlertProps as ICoreUseErrorAlertProps,
  IUseErrorAlertResult,
  useErrorAlert as useCoreErrorAlert,
} from "@reactionable/core/lib/ui/alert/ErrorAlert";

import { Alert, IAlertProps } from "./Alert";

export type IErrorAlertProps = ICoreErrorAlertProps<IAlertProps>;
export type ErrorAlertComponent = CoreErrorAlertComponent<IErrorAlertProps>;
export const ErrorAlert: ErrorAlertComponent = ({ children, ...props }: IErrorAlertProps) => {
  return (
    <Alert severity="error" {...props}>
      {printError(children)}
    </Alert>
  );
};

export type IUseErrorAlertProps = ICoreUseErrorAlertProps & Omit<IAlertProps, "children">;
export const useErrorAlert = (props?: IUseErrorAlertProps): IUseErrorAlertResult => {
  return useCoreErrorAlert<IUseErrorAlertProps>({
    Component: ErrorAlert,
    ...props,
  });
};
