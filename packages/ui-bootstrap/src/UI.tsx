import { IUIContextProviderProps as ICoreUIContextProviderProps, IUseLoaderProps, useUIContext as useCoreUIContext } from '@reactionable/core';
import { useLoader } from './loader/Loader';
import { useSuccessNotification, IUseSuccessNotificationProps } from './notification/SuccessNotification';
import { useErrorNotification, IUseErrorNotificationProps } from './notification/ErrorNotification';
import { useErrorAlert, IUseErrorAlertProps } from './alert/ErrorAlert';
import { useWarningAlert, IUseWarningAlertProps } from './alert/WarningAlert';
import { useConfirmation, IUseConfirmationProps } from './confirmation/Confirmation';
import { useLayout, IUseLayoutProps } from './layout/Layout';
import { useModalForm, IUseModalFormProps } from './modal/ModalForm';

export type IUIContextProviderProps = ICoreUIContextProviderProps<
    IUseLoaderProps,
    IUseSuccessNotificationProps,
    IUseErrorNotificationProps,
    IUseErrorAlertProps,
    IUseWarningAlertProps,
    IUseConfirmationProps,
    IUseLayoutProps,
    IUseModalFormProps
>;

export function useUIContext() {
    return useCoreUIContext<IUseLoaderProps,
    IUseSuccessNotificationProps,
    IUseErrorNotificationProps,
    IUseErrorAlertProps,
    IUseWarningAlertProps,
    IUseConfirmationProps,
    IUseLayoutProps,
    IUseModalFormProps>();
}

export const useUIContextProviderProps = (): IUIContextProviderProps => {
    return {
        useLoader,
        useSuccessNotification,
        useErrorNotification,
        useErrorAlert,
        useWarningAlert,
        useConfirmation,
        useLayout,
        useModalForm,
    };
}