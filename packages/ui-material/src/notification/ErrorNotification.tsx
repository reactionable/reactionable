import { SnackbarProps } from '@material-ui/core/Snackbar/Snackbar';
import {
  IErrorNotificationProps as ICoreErrorNotificationProps,
  IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
  useErrorNotification as useCoreErrorNotification,
} from '@reactionable/core/lib/ui/notification/ErrorNotification';
import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { IAlertProps } from '../alert/Alert';
import { ErrorAlert } from '../alert/ErrorAlert';
import { Notification } from './Notification';

export type IErrorNotificationProps = ICoreErrorNotificationProps &
  Omit<SnackbarProps, 'children' | 'title'> & { alert?: IAlertProps };

export const ErrorNotification = ({
  title,
  children,
  alert,
  ...props
}: PropsWithChildren<IErrorNotificationProps>) => {
  const { t } = useTranslation();
  if (!title) {
    title = t('An error has occured');
  }

  return (
    <Notification {...props} title={title}>
      <ErrorAlert
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

export type IUseErrorNotificationProps = ICoreUseErrorNotificationProps & IErrorNotificationProps;
export const useErrorNotification = (props: IErrorNotificationProps) => {
  return useCoreErrorNotification<IErrorNotificationProps>({
    ...props,
    Component: ErrorNotification,
  });
};
