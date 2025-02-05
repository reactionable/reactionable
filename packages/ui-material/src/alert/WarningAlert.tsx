import {
  IUseWarningAlertProps as ICoreUseWarningAlertProps,
  IUseWarningAlertResult,
  WarningAlertComponent,
  useWarningAlert as useCoreWarningAlert,
} from "@reactionable/core";

import { Alert, IAlertProps } from "./Alert";

export const WarningAlert: WarningAlertComponent = (props) => {
  return <Alert severity="warning" {...props} />;
};

export type IUseWarningAlertProps = IAlertProps & ICoreUseWarningAlertProps;
export const useWarningAlert = (props?: IAlertProps): IUseWarningAlertResult => {
  return useCoreWarningAlert<IUseWarningAlertProps>({ Component: WarningAlert, ...props });
};
