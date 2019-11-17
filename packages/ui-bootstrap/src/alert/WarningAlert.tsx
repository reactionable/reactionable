import React from 'react';
import { IAlertProps, Alert } from './Alert';
import {
    IUseWarningAlertProps as ICoreUseWarningAlertProps,
    WarningAlertComponent, useWarningAlert as useCoreWarningAlert
} from '@reactionable/core';

export const WarningAlert: WarningAlertComponent = (props) => {
    return <Alert variant="warning" {...props} />;
};

export type IUseWarningAlertProps = ICoreUseWarningAlertProps & IAlertProps;
export const useWarningAlert = (props?: IAlertProps) => {
    return useCoreWarningAlert<IAlertProps>({ Component: WarningAlert, ...props });
};