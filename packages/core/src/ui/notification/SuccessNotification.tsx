import * as React from 'react';
import { INotificationProps, IUseNotificationProps, useNotification, NotificationComponent } from './Notification';

export type ISuccessNotificationProps = INotificationProps;

export type SuccessNotificationComponent = NotificationComponent;

export type IUseSuccessNotificationProps = IUseNotificationProps;

export interface IUseSuccessNotificationResult {
    successNotification: React.ReactElement;
    setSuccessNotification: (message?: string) => void;
};

export type IUseSuccessNotification<P extends IUseSuccessNotificationProps> = (props: P) => IUseSuccessNotificationResult;
export function useSuccessNotification<P extends IUseSuccessNotificationProps>(props: P & { Component: SuccessNotificationComponent }) {
    const {
        notification: successNotification,
        setNotification: setSuccessNotification,
    } = useNotification(props);
    return { successNotification, setSuccessNotification };
};