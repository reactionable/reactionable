import React from 'react';
import {
  SuccessNotificationComponent,
  useSuccessNotification as useCoreSuccessNotification,
  ISuccessNotificationProps as ICoreSuccessNotificationProps,
  IUseSuccessNotificationProps as ICoreUseSuccessNotificationProps,
} from '@reactionable/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Notification } from './Notification';

export type ISuccessNotificationProps = ICoreSuccessNotificationProps;

const SuccessNotification: SuccessNotificationComponent = (props) => {
  return (
    <Notification {...props} variant={'sucess'}>
      <FontAwesomeIcon icon={faCheckCircle} /> {props.children}
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
