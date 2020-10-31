import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
  ISuccessNotificationProps as ICoreSuccessNotificationProps,
  IUseSuccessNotificationProps as ICoreUseSuccessNotificationProps,
  useSuccessNotification as useCoreSuccessNotification,
} from '@reactionable/core/lib/ui/notification/SuccessNotification';
import React, { PropsWithChildren } from 'react';

import { Alert } from '../alert/Alert';
import { Notification } from './Notification';

export type ISuccessNotificationProps = ICoreSuccessNotificationProps;

export const SuccessNotification = ({
  children,
  ...props
}: PropsWithChildren<ISuccessNotificationProps>) => {
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
