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
  title,
  ...props
}: PropsWithChildren<ISuccessNotificationProps>) => {
  return (
    <Notification {...props} title={<>{title}</>}>
      <Alert severity="success" title={title} children={children} />
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
