import React, { FC } from 'react';
import {
  IError,
  IErrorNotificationProps as ICoreErrorNotificationProps,
  useErrorNotification as useCoreErrorNotification,
  IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
} from '@reactionable/core';
import { useTranslation } from 'react-i18next';
import { ErrorAlert } from '../alert/ErrorAlert';
import { Notification } from './Notification';

export type IErrorNotificationProps = ICoreErrorNotificationProps & {
  children?: IError;
  title?: string;
};

export const ErrorNotification: FC<IErrorNotificationProps> = (props) => {
  if (!props.title) {
    const { t } = useTranslation();
    props.title = t('An error has occured');
  }
  return (
    <Notification variant={'danger'} title={props.title} {...props}>
      <ErrorAlert>{props.children}</ErrorAlert>
    </Notification>
  );
};

export type IUseErrorNotificationProps = ICoreUseErrorNotificationProps & IErrorNotificationProps;
export const useErrorNotification = (props: IErrorNotificationProps) => {
  let notificationTitle: string;
  if (props.title === undefined) {
    const { t } = useTranslation();
    notificationTitle = t('An error has occured');
  } else {
    notificationTitle = props.title;
  }
  return useCoreErrorNotification<IErrorNotificationProps>({
    title: notificationTitle,
    Component: ErrorNotification,
  });
};
