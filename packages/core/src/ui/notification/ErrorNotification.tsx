import * as React from 'react';
import { IError } from '../alert/ErrorAlert';
import { INotificationProps } from './Notification';

export type ErrorNotificationComponent = React.FC<INotificationProps & {
    children?: IError
}>;

export type IUseErrorNotificationProps = React.PropsWithChildren<INotificationProps> & {
    children?: IError;
};

export interface IUseErrorNotificationResult {
    errorNotification: React.ReactElement;
    setErrorNotification: (error?: IError) => void;
};

export type IUseErrorNotification<P extends IUseErrorNotificationProps> = (props: P) => IUseErrorNotificationResult;
export function useErrorNotification<P extends IUseErrorNotificationProps>({ Component, ...props }: P & { Component: ErrorNotificationComponent }): IUseErrorNotificationResult {
    const [errorNotification, setErrorNotification] = React.useState<IError | undefined>(undefined);
    return {
        errorNotification: <>{errorNotification && <Component
            {...props}
            children={errorNotification}
            onClose={() => setErrorNotification(undefined)}
        />}</>,
        setErrorNotification
    };
};