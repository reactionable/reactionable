import * as React from 'react';
import Toast from 'react-bootstrap/Toast';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNotification, INotificationProps, NotificationComponent, IError } from '@reactionable/core';
import { ErrorAlert } from '../alert/ErrorAlert';

const Notification: React.FC<INotificationProps & {
    variant: string,
}> = (props) => {

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
        className={'border-' + props.variant}
    >
        <Toast.Header className={'text-' + props.variant}>
            <strong className="mr-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>{props.children}</Toast.Body>
    </Toast>;
};

const SuccessNotification: NotificationComponent = (props) => {
    return <Notification {...props} variant={'sucess'}>
        <FontAwesomeIcon icon={faCheckCircle} /> {props.children}
    </Notification>
}

export const useSuccessNotification = (title: string) => {
    return useNotification({
        title,
        Component: SuccessNotification,
    });
}

const ErrorNotification: React.FC<INotificationProps & {
    children?: IError;
    title?: string;
}> = (props) => {
    if (!props.title) {
        const { t } = useTranslation();
        props.title = t('An error has occured');
    }
    return <Notification
        variant={'danger'}
        title={props.title}
        {...props}
    >
        <ErrorAlert>{props.children}</ErrorAlert>
    </Notification>
}

export const useErrorNotification = (title?: string) => {
    let notificationTitle: string;
    if (title === undefined) {
        const { t } = useTranslation();
        notificationTitle = t('An error has occured');
    }
    else {
        notificationTitle = title;
    }
    return useNotification({
        title: notificationTitle,
        Component: ErrorNotification,
    });
}
