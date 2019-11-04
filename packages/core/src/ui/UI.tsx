import * as React from 'react';
import { useLoader, IUseLoader, IUseLoaderProps } from './loader/Loader';
import { IUseSuccessNotification, useSuccessNotification, IUseSuccessNotificationProps } from './notification/SuccessNotification';
import { IUseErrorNotification, useErrorNotification, IUseErrorNotificationProps } from './notification/ErrorNotification';
import { IUseErrorAlert, useErrorAlert, IUseErrorAlertProps } from './alert/ErrorAlert';
import { IUseWarningAlert, useWarningAlert, IUseWarningAlertProps } from './alert/WarningAlert';
import { IUseConfirmationProps, useConfirmation, IUseConfirmation } from './confirmation/Confirmation';
import { IUseLayoutProps, useLayout, IUseLayout } from './layout/Layout';

export type IUIContext<
    LO extends IUseLoaderProps = IUseLoaderProps,
    SN extends IUseSuccessNotificationProps = IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps = IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps = IUseErrorAlertProps,
    WA extends IUseWarningAlertProps = IUseWarningAlertProps,
    CO extends IUseConfirmationProps = IUseConfirmationProps,
    LA extends IUseLayoutProps = IUseLayoutProps,
    > = {
        useLoader: IUseLoader<LO>;
        useSuccessNotification: IUseSuccessNotification<SN>;
        useErrorNotification: IUseErrorNotification<EN>;
        useErrorAlert: IUseErrorAlert<EA>;
        useWarningAlert: IUseWarningAlert<WA>;
        useConfirmation: IUseConfirmation<CO>;
        useLayout: IUseLayout<LA>;
    };

export const UIContext = React.createContext<IUIContext<any,any,any,any,any,any,any>>({
    useLoader,
    useSuccessNotification,
    useErrorNotification,
    useErrorAlert,
    useWarningAlert,
    useConfirmation,
    useLayout,
});

export type IUIContextProviderProps<
    LO extends IUseLoaderProps = IUseLoaderProps,
    SN extends IUseSuccessNotificationProps = IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps = IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps = IUseErrorAlertProps,
    WA extends IUseWarningAlertProps = IUseWarningAlertProps,
    CO extends IUseConfirmationProps = IUseConfirmationProps,
    LA extends IUseLayoutProps = IUseLayoutProps,
    > = React.PropsWithChildren<IUIContext<LO, SN, EN, EA, WA, CO, LA>>;

export function UIContextProvider<
    LO extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    CO extends IUseConfirmationProps,
    LA extends IUseLayoutProps,
>(props: IUIContextProviderProps<LO, SN, EN, EA, WA, CO, LA>) {
    return <UIContext.Provider
        value={props}
    >{props.children}</UIContext.Provider>;
};

export function useUIContext<
    LO extends IUseLoaderProps,
    SN extends IUseSuccessNotificationProps,
    EN extends IUseErrorNotificationProps,
    EA extends IUseErrorAlertProps,
    WA extends IUseWarningAlertProps,
    CO extends IUseConfirmationProps,
    LA extends IUseLayoutProps,
>() {
    return React.useContext<IUIContext<LO, SN, EN, EA, WA, CO, LA>>(UIContext);
}
