import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { IAlertProps } from './Alert';
import { IError } from '../../error/IError';

export function isIError(arg: any): arg is IError {
    return arg.name !== undefined && arg.message !== undefined;
};

export type IErrorAlertProps = IAlertProps;
export type ErrorAlertComponent = FC<IErrorAlertProps & {
    children?: IError
}>;

export type IUseErrorAlertProps = PropsWithChildren<IAlertProps> & {
    children?: IError;
};

export interface IUseErrorAlertResult {
    errorAlert: ReactElement;
    setErrorAlert: (alert?: IError) => void;
};

export type IUseErrorAlert<P extends IUseErrorAlertProps> = (props: P) => IUseErrorAlertResult;
export function useErrorAlert<P extends IUseErrorAlertProps>({ Component, ...props }: P & { Component: ErrorAlertComponent }): IUseErrorAlertResult {
    const [errorAlert, setErrorAlert] = useState<IError | undefined>(props.children
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