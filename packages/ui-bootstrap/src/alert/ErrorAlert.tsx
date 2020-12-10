import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
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
    <Alert variant="danger" icon={{ icon: faExclamationTriangle }} {...props}>
      {printError(children)}
    </Alert>
  );
};

export type IUseErrorAlertProps = ICoreUseErrorAlertProps & IAlertProps;
export const useErrorAlert = (props?: IUseErrorAlertProps): IUseErrorAlertResult => {
  return useCoreErrorAlert<IUseErrorAlertProps>({
    Component: ErrorAlert,
    ...props,
  });
};
