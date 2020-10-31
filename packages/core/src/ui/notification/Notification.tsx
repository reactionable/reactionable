import React, { ComponentType, PropsWithChildren, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface INotificationProps {
  title: ReactNode;
  onClose?: () => void;
}

export type NotificationComponent = ComponentType<INotificationProps>;

export const Notification: NotificationComponent = ({ children, title }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div>{'string' === typeof title ? t(title) : title}</div>
      <div>{children}</div>
    </div>
  );
};

export type IUseNotificationProps = PropsWithChildren<INotificationProps>;

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
        {notification && (
          <Component
            {...props}
            children={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
      </>
    ),
    setNotification,
  };
}
