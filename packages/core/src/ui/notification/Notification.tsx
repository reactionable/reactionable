import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';

export interface INotificationProps {
    title: string,
    onClose?: () => void,
};

export type NotificationComponent = FC<INotificationProps>;

export type IUseNotificationProps = PropsWithChildren<INotificationProps>;

export interface IUseNotificationResult {
    notification: ReactElement;
    setNotification: (message?: string) => void;
};

export type IUseNotification<P extends IUseNotificationProps> = (props: P) => IUseNotificationResult;
export function useNotification<P extends IUseNotificationProps>({ Component, ...props }: P & { Component: NotificationComponent }): IUseNotificationResult {
    const [notification, setNotification] = useState<string | undefined>(undefined);
    return {
        notification: <>{notification && <Component
            {...props}
            children={notification}
            onClose={() => setNotification(undefined)}
        />}</>,
        setNotification,
    };
};