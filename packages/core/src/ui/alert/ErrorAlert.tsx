import * as React from 'react';
import { IAlertProps } from './Alert';

export interface IError extends Error {
    code?: number;
}

export function isIError(arg: any): arg is IError {
    return arg.name !== undefined && arg.message !== undefined;
}

export type IErrorAlertProps = IAlertProps;
export type ErrorAlertComponent = React.FC<IErrorAlertProps & {
    children?: IError
}>;

export type IUseErrorAlertProps = React.PropsWithChildren<IAlertProps> & {
    children?: IError;
};

export interface IUseErrorAlertResult {
    errorAlert: React.ReactElement;
    setErrorAlert: (alert?: IError) => void;
};

export type IUseErrorAlert<P extends IUseErrorAlertProps> = (props: P) => IUseErrorAlertResult;
export function useErrorAlert<P extends IUseErrorAlertProps>({ Component, ...props }: P & { Component: ErrorAlertComponent }): IUseErrorAlertResult {
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