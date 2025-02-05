import { ReactNode } from "react";

import {
  INotificationProps,
  IUseNotificationProps,
  INotificationComponent,
  useNotification,
  Notification,
} from "./Notification";

export type ISuccessNotificationProps = INotificationProps;

export type ISuccessNotificationComponent = INotificationComponent;

export type IUseSuccessNotificationProps = IUseNotificationProps;

export const SuccessNotification = Notification;

export interface IUseSuccessNotificationResult {
  successNotification: ReactNode;
  setSuccessNotification: (message?: ReactNode) => void;
}

export type IUseSuccessNotification<
  UseSuccessNotificationProps extends IUseSuccessNotificationProps,
> = (props: UseSuccessNotificationProps) => IUseSuccessNotificationResult;
export function useSuccessNotification<P extends IUseSuccessNotificationProps>(
  props: P & { Component: ISuccessNotificationComponent }
): IUseSuccessNotificationResult {
  const { notification: successNotification, setNotification: setSuccessNotification } =
    useNotification(props);
  return { successNotification, setSuccessNotification };
}
