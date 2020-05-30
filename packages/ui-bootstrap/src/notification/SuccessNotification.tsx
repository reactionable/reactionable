import React from 'react';
import {
  SuccessNotificationComponent,
  useSuccessNotification as useCoreSuccessNotification,
  ISuccessNotificationProps as ICoreSuccessNotificationProps,
  IUseSuccessNotificationProps as ICoreUseSuccessNotificationProps,
} from '@reactionable/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Notification } from './Notification';
import { Alert } from '../alert/Alert';

export type ISuccessNotificationProps = ICoreSuccessNotificationProps;

export const SuccessNotification: SuccessNotificationComponent = ({ children, ...props }) => {
  const variant = 'success';
  return (
    <Notification variant={variant} {...props}>
      <Alert
        variant={variant}
        icon={{ icon: faCheckCircle }}
        children={children}
        className="mb-0"
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
