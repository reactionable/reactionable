import * as React from 'react';
import { IAlertProps } from './Alert';

export interface IError extends Error {
    code?: number;
}

export function isIError(arg: any): arg is IError {
    return arg.name !== undefined && arg.message !== undefined;
}

export interface IErrorAlertProps extends IAlertProps {};

export interface ErrorAlertComponent extends React.FC<IErrorAlertProps> {
    children?: IError
};

export interface IUseErrorAlertProps extends IErrorAlertProps {
    Component: ErrorAlertComponent;    
    children?: IError;
};

export interface IUseErrorAlert {
    errorAlert: React.ReactElement;
    setErrorAlert: (alert?: IError) => void;
};

export const useErrorAlert = ({ Component, ...props }: IUseErrorAlertProps): IUseErrorAlert => {
    const [errorAlert, setErrorAlert] = React.useState<IError | undefined>(props.children
        ? props.children
        : undefined
    );
    return {
        errorAlert: <>{errorAlert && <Component {...props} children={errorAlert} />}</>,
        setErrorAlert: (alert?: IError) => {
            setErrorAlert(alert);
        },
    };
};