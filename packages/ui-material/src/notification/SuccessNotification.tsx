import { SnackbarProps } from '@material-ui/core/Snackbar/Snackbar';
import {
  ISuccessNotificationProps as ICoreSuccessNotificationProps,
  IUseSuccessNotificationProps as ICoreUseSuccessNotificationProps,
  useSuccessNotification as useCoreSuccessNotification,
} from '@reactionable/core/lib/ui/notification/SuccessNotification';
import React, { PropsWithChildren } from 'react';

import { Alert, IAlertProps } from '../alert/Alert';
import { Notification } from './Notification';

export type ISuccessNotificationProps = ICoreSuccessNotificationProps &
  Omit<SnackbarProps, 'children' | 'title'> & { alert?: IAlertProps };

export const SuccessNotification = ({
  children,
  title,
  alert,
  ...props
}: PropsWithChildren<ISuccessNotificationProps>) => {
  return (
    <Notification {...props} title={<>{title}</>}>
      <Alert
        severity="success"
        title={title}
        elevation={6}
        variant="filled"
        {...alert}
        onClose={props.onClose}
        children={children}
      />
    </Notification>
  );
};

export type IUseSuccessNotificationProps = ICoreUseSuccessNotificationProps &
  ISuccessNotificationProps;
export const useSuccessNotification = (props: IUseSuccessNotificationProps) => {
  return useCoreSuccessNotification<ISuccessNotificationProps>({
    ...props,
    Component: SuccessNotification,
  });
};
