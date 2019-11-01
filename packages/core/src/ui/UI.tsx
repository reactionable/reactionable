import * as React from 'react';
import { useLoader, IUseLoader, IUseLoaderProps } from './loader/Loader';
import { IUseSuccessNotification, useSuccessNotification, IUseSuccessNotificationProps } from './notification/SuccessNotification';
import { IUseErrorNotification, useErrorNotification, IUseErrorNotificationProps } from './notification/ErrorNotification';
import { IUseErrorAlert, useErrorAlert, IUseErrorAlertProps } from './alert/ErrorAlert';
import { IUseWarningAlert, useWarningAlert, IUseWarningAlertProps } from './alert/WarningAlert';
import { IUseConfirmationProps, useConfirmation, IUseConfirmation } from './confirmation/Confirmation';

export type IUIContext<
    L extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    C extends IUseConfirmationProps,
    > = {
        useLoader: IUseLoader<L>;
        useSuccessNotification: IUseSuccessNotification<SN>;
        useErrorNotification: IUseErrorNotification<EN>;
        useErrorAlert: IUseErrorAlert<EA>;
        useWarningAlert: IUseWarningAlert<WA>;
        useConfirmation: IUseConfirmation<C>;
    };

export const UIContext = React.createContext<IUIContext<any, any, any, any, any, any>>({
    useLoader,
    useSuccessNotification,
    useErrorNotification,
    useErrorAlert,
    useWarningAlert,
    useConfirmation,
});

export type IUIContextProviderProps<
    L extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    C extends IUseConfirmationProps,
    > = React.PropsWithChildren<IUIContext<L, SN, EN, EA, WA, C>>;

export function UIContextProvider<
    L extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    C extends IUseConfirmationProps,
>(props: IUIContextProviderProps<L, SN, EN, EA, WA, C>) {
    return <UIContext.Provider
        value={props}
    >{props.children}</UIContext.Provider>;
};

export function useUIContext<
    L extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    C extends IUseConfirmationProps,
>() {
    return React.useContext<IUIContext<L, SN, EN, EA, WA, C>>(UIContext);
}
