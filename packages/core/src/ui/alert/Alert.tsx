import * as React from 'react';

export type IAlertProps = {};

export type AlertComponent = React.FC<IAlertProps>;

export type IUseAlertProps = React.PropsWithChildren<IAlertProps>;

export interface IUseAlertResult {
    alert: React.ReactElement;
    setAlert: (alert?: React.ReactNode) => void;
};

export type IUseAlert<P extends IUseAlertProps> = (props: P) => IUseAlertResult;
export function useAlert<P extends IUseAlertProps>({ Component, ...props }: P & { Component: AlertComponent }): IUseAlertResult {
    const [alert, setAlert] = React.useState<React.ReactNode | undefined>(props.children
        ? props.children
        : undefined
    );
    return {
        alert: <>{alert && <Component {...props} children={alert} />}</>,
        setAlert: (alert?: React.ReactNode) => {
            setAlert(alert);
        },
    };
};
