import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
  IUseWarningAlertProps as ICoreUseWarningAlertProps,
  IUseWarningAlertResult,
  WarningAlertComponent,
  useWarningAlert as useCoreWarningAlert,
} from "@reactionable/core/lib/ui/alert/WarningAlert";

import { Alert, IAlertProps } from "./Alert";

export const WarningAlert: WarningAlertComponent = (props) => {
  return <Alert variant="warning" icon={{ icon: faExclamationTriangle }} {...props} />;
};

export type IUseWarningAlertProps = ICoreUseWarningAlertProps & IAlertProps;
export const useWarningAlert = (props?: IAlertProps): IUseWarningAlertResult => {
  return useCoreWarningAlert<IUseWarningAlertProps>({ Component: WarningAlert, ...props });
};
