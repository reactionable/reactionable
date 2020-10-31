import {
  INotificationProps as ICoreNotificationProps,
  useNotification as useCoreNotification,
} from '@reactionable/core/lib/ui/notification/Notification';
import React, { PropsWithChildren } from 'react';
import Toast from 'react-bootstrap/Toast';

export type INotificationProps = ICoreNotificationProps & {
  variant?: string;
};

export const Notification = (props: PropsWithChildren<INotificationProps>) => {
  return (
    <Toast
      show
      autohide
      onClose={props.onClose}
      style={{
        position: 'fixed',
        top: '1vw',
        right: '1vw',
        zIndex: 9999,
      }}
      className={props.variant ? 'border-' + props.variant : ''}
    >
      <Toast.Header className={props.variant ? 'text-' + props.variant : ''}>
        <strong className="mr-auto">{props.title}</strong>
      </Toast.Header>
      <Toast.Body>{props.children}</Toast.Body>
    </Toast>
  );
};

export const useNotification = (props: INotificationProps) => {
  return useCoreNotification<INotificationProps>({
    ...props,
    Component: Notification,
  });
};
