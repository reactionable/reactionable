import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {
  IUseWarningAlertProps as ICoreUseWarningAlertProps,
  WarningAlertComponent,
  useWarningAlert as useCoreWarningAlert,
} from '@reactionable/core/lib/ui/alert/WarningAlert';
import React from 'react';

import { Alert, IAlertProps } from './Alert';

export const WarningAlert: WarningAlertComponent = (props) => {
  return <Alert variant="warning" icon={{ icon: faExclamationTriangle }} {...props} />;
};

export type IUseWarningAlertProps = ICoreUseWarningAlertProps & IAlertProps;
export const useWarningAlert = (props?: IAlertProps) => {
  return useCoreWarningAlert<IAlertProps>({ Component: WarningAlert, ...props });
};
