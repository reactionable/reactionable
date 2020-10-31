import {
  IErrorNotificationProps as ICoreErrorNotificationProps,
  IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
  useErrorNotification as useCoreErrorNotification,
} from '@reactionable/core/lib/ui/notification/ErrorNotification';
import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorAlert } from '../alert/ErrorAlert';
import { Notification } from './Notification';

export type IErrorNotificationProps = ICoreErrorNotificationProps;

export const ErrorNotification = ({
  title,
  children,
  ...props
}: PropsWithChildren<IErrorNotificationProps>) => {
  const { t } = useTranslation();
  if (!title) {
    title = t('An error has occured');
  }

  return (
    <Notification {...props} title={title}>
      <ErrorAlert title={title} children={children} />
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
