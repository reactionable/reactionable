import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert, IAlertProps } from './Alert';
import { IError, IErrorAlertProps as ICoreErrorAlertProps, useErrorAlert as useErrorAlertCore } from '@reactionable/core';

export type IErrorAlertProps = IAlertProps & ICoreErrorAlertProps & {
    children?: IError
};
export type ErrorAlertComponent = React.FC<IErrorAlertProps>;
export const ErrorAlert: ErrorAlertComponent = ({ children, ...props }) => {
    return <Alert variant="danger" {...props}>
        <FontAwesomeIcon icon={faExclamationCircle} /> {children && children.message}
    </Alert>;
};

export const useErrorAlert = (props?: IErrorAlertProps) => {
    return useErrorAlertCore({ Component: ErrorAlert, ...props });
};