import * as React from 'react';
import { useAlert, IAlertProps } from './Alert';

export type IWarningAlertProps = IAlertProps;
export type WarningAlertComponent = React.FC<IWarningAlertProps>;

export type IUseWarningAlertProps = React.PropsWithChildren<IWarningAlertProps>;

export interface IUseWarningAlertResult {
    warningAlert: React.ReactElement;
    setWarningAlert: (alert?: React.ReactNode) => void;
};

export type IUseWarningAlert<P extends IUseWarningAlertProps> = (props: P) => IUseWarningAlertResult;
export function useWarningAlert<P extends IUseWarningAlertProps>(props: P & { Component: WarningAlertComponent }) {
    const {
        alert: warningAlert,
        setAlert: setWarningAlert,
    } = useAlert<P>(props);
    return { warningAlert, setWarningAlert };
};