import {
  INotificationProps as ICoreNotificationProps,
  IUseNotificationProps as ICoreUseNotificationProps,
  useNotification as useCoreNotification,
} from '@reactionable/core/lib/ui/notification/Notification';
import React, { PropsWithChildren } from 'react';
import Toast, { ToastProps } from 'react-bootstrap/Toast';

export type INotificationProps = ICoreNotificationProps &
  ToastProps & {
    variant?: string;
  };

export const Notification = ({
  onClose,
  variant,
  title,
  children,
  ...props
}: PropsWithChildren<INotificationProps>) => {
  return (
    <Toast
      autohide
      onClose={onClose}
      style={{
        position: 'fixed',
        top: '1vw',
        right: '1vw',
        zIndex: 9999,
      }}
      className={variant ? 'border-' + variant : ''}
      {...props}
    >
      <Toast.Header className={variant ? 'text-' + variant : ''}>
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
};

export type IUseNotificationProps = ICoreUseNotificationProps<INotificationProps>;

export const useNotification = (props: IUseNotificationProps) => {
  return useCoreNotification<INotificationProps>({
    ...props,
    Component: Notification,
  });
};
