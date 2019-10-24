import * as React from 'react';
import BootstrapAlert, { AlertProps } from 'react-bootstrap/Alert';
import { useAlert as useAlertCore, IAlertProps as IAlertPropsCore } from '@reactionable/core';

export type IAlertProps = IAlertPropsCore & AlertProps & {};
export type AlertComponent = React.FC<IAlertProps>;
export const Alert: AlertComponent = ({ children, ...props }) => {
    return <BootstrapAlert {...props}>{children}</BootstrapAlert>;
};

export const useAlert = (props?: IAlertProps) => {
    return useAlertCore({ Component: Alert, ...props });
};