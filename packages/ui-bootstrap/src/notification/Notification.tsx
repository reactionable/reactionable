import React, { FC } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useNotification as useCoreNotification, INotificationProps as ICoreNotificationProps } from '@reactionable/core';

export type INotificationProps = ICoreNotificationProps & {
    variant?: string;
};

export const Notification: FC<INotificationProps> = (props) => {
    return <Toast
        show
        autohide
        onClose={props.onClose}
        transition={false}
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
    </Toast>;
};

export const useNotification = (title: string) => {
    return useCoreNotification<INotificationProps>({
        title,
        Component: Notification,
    });
};