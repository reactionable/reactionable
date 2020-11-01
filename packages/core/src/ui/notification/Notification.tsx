import React, { ComponentType, PropsWithChildren, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface INotificationProps {
  title: ReactNode;
  onClose?: () => void;
  show?: boolean;
}

export type NotificationComponent = ComponentType<INotificationProps>;

export const Notification: NotificationComponent = ({ children, title, show = true }) => {
  const { t } = useTranslation();
  return (
    <div hidden={!show}>
      <div>{'string' === typeof title ? t(title) : title}</div>
      <div>{children}</div>
    </div>
  );
};

export type IUseNotificationProps<
  NotificationProps extends INotificationProps = INotificationProps
> = PropsWithChildren<NotificationProps>;

export interface IUseNotificationResult {
  notification: ReactNode;
  setNotification: (message?: string) => void;
}

export type IUseNotification<P extends IUseNotificationProps> = (
  props: P
) => IUseNotificationResult;
export function useNotification<P extends IUseNotificationProps>({
  Component,
  ...props
}: P & { Component: NotificationComponent }): IUseNotificationResult {
  const [notification, setNotification] = useState<string | undefined>(undefined);
  return {
    notification: (
      <>
        {
          <Component
            {...props}
            children={notification}
            onClose={() => setNotification(undefined)}
            show={!!notification}
          />
        }
      </>
    ),
    setNotification,
  };
}
