import * as React from 'react';
import Alert, { AlertProps } from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useErrorAlert as useErrorAlertCore, isIError, IErrorAlertProps as IErrorAlertPropsCore } from '@reactionable/core';

export type IErrorAlertProps = IErrorAlertPropsCore & AlertProps & {};
export type ErrorAlertComponent = React.FC<IErrorAlertProps>;
export const ErrorAlert: ErrorAlertComponent = ({ children, ...props }) => {

    let alertContent: React.ReactElement;
    if (isIError(children)) {
        alertContent = <><FontAwesomeIcon icon={faExclamationCircle} /> {children.message}</>;
    }
    else {
        alertContent = <>{children}</>;
    }

    return <Alert variant="danger" {...props}>{alertContent}</Alert>;
};

export const useErrorAlert = (props?: IErrorAlertProps) => {
    return useErrorAlertCore({ Component: ErrorAlert, ...props });
};