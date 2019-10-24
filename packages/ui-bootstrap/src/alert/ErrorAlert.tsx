import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useErrorAlert as useErrorAlertCore, IErrorAlertProps as IErrorAlertPropsCore, IError } from '@reactionable/core';
import { Alert, IAlertProps } from './Alert';

export type IErrorAlertProps = IAlertProps & IErrorAlertPropsCore & {
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