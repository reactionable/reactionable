import * as React from 'react';

export interface INotificationProps {
    title: string,
    onClose?: () => void,
};
export type NotificationComponent = React.FC<INotificationProps>;

export interface IUseNotificationProps extends Pick<INotificationProps, 'title'> {
    Component: NotificationComponent;
};

export interface IUseNotification {
    notification: React.ReactElement;
    setNotification: (message: string) => void;
};

export const useNotification = ({ Component, ...props }: IUseNotificationProps): IUseNotification => {
    const [notification, setNotification] = React.useState<string|undefined>(undefined);
    return {
        notification: <>{notification && <Component
            {...props}
            children={notification}
            onClose={() => setNotification(undefined)}
        />}</>,
        setNotification
    };
};
