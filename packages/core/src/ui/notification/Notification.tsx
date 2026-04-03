import { ComponentType, PropsWithChildren, ReactNode, useState } from "react";

export interface INotificationProps {
  title: ReactNode;
  onClose?: () => void;
  show?: boolean;
}

export type INotificationComponent = ComponentType<PropsWithChildren<INotificationProps>>;

export const Notification: INotificationComponent = ({
  children,
  title,
  show = true,
}: PropsWithChildren<INotificationProps>) => {
  return (
    <div hidden={!show}>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export type IUseNotificationProps<
  NotificationProps extends INotificationProps = INotificationProps
> = PropsWithChildren<NotificationProps & { Component?: INotificationComponent }>;

export interface IUseNotificationResult {
  notification: ReactNode;
  setNotification: (message?: ReactNode) => void;
}

export type IUseNotification<P extends IUseNotificationProps> = (
  props: P
) => IUseNotificationResult;
export function useNotification<P extends IUseNotificationProps>({
  Component,
  ...props
}: P): IUseNotificationResult {
  const [notification, setNotification] = useState<ReactNode | undefined>(undefined);

  if (!Component) {
    Component = Notification;
  }

  return {
    notification: (
      <Component {...props} onClose={() => setNotification(undefined)} show={!!notification}>
        {notification}
      </Component>
    ),
    setNotification,
  };
}
