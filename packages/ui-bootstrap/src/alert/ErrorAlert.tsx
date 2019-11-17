import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert, IAlertProps } from './Alert';
import {
    IError, IErrorAlertProps as ICoreErrorAlertProps,
    useErrorAlert as useCoreErrorAlert, IUseErrorAlertProps as ICoreUseErrorAlertProps
} from '@reactionable/core';

export type IErrorAlertProps = IAlertProps & ICoreErrorAlertProps & {
    children?: IError
};
export type ErrorAlertComponent = FC<IErrorAlertProps>;
export const ErrorAlert: ErrorAlertComponent = ({ children, ...props }) => {
    return <Alert variant="danger" {...props}>
        <FontAwesomeIcon icon={faExclamationCircle} /> {children && children.message}
    </Alert>;
};

export type IUseErrorAlertProps = ICoreUseErrorAlertProps & IAlertProps;
export const useErrorAlert = (props?: IErrorAlertProps) => {
    return useCoreErrorAlert<IErrorAlertProps>({ Component: ErrorAlert, ...props });
};