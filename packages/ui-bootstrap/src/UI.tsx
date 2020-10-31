import { IUseLoaderProps } from '@reactionable/core/lib/ui/loader/useLoader';
import {
  UIContextProvider as CoreUIContextProvider,
  IUIContextProviderProps as ICoreUIContextProviderProps,
  UIContext,
  useUIContext as useCoreUIContext,
} from '@reactionable/core/lib/ui/UI';
import React, { ConsumerProps, PropsWithChildren } from 'react';

import { IUseErrorAlertProps, useErrorAlert } from './alert/ErrorAlert';
import { IUseWarningAlertProps, useWarningAlert } from './alert/WarningAlert';
import { IUseConfirmationProps, useConfirmation } from './confirmation/Confirmation';
import { IUseFormProps, useForm } from './form/Form';
import { IUseLayoutProps, useLayout } from './layout/Layout';
import { useLoader } from './loader/Loader';
import { IUseModalProps, useModal } from './modal/Modal';
import { IUseModalFormProps, useModalForm } from './modal/useModalForm';
import { IUseErrorNotificationProps, useErrorNotification } from './notification/ErrorNotification';
import {
  IUseSuccessNotificationProps,
  useSuccessNotification,
} from './notification/SuccessNotification';

export type IUIContextProviderProps = ICoreUIContextProviderProps<
  IUseLoaderProps,
  IUseSuccessNotificationProps,
  IUseErrorNotificationProps,
  IUseErrorAlertProps,
  IUseWarningAlertProps,
  IUseConfirmationProps,
  IUseLayoutProps,
  IUseFormProps,
  IUseModalProps,
  IUseModalFormProps
>;

export function useUIContext() {
  return useCoreUIContext<
    IUseLoaderProps,
    IUseSuccessNotificationProps,
    IUseErrorNotificationProps,
    IUseErrorAlertProps,
    IUseWarningAlertProps,
    IUseConfirmationProps,
    IUseLayoutProps,
    IUseFormProps,
    IUseModalProps,
    IUseModalFormProps
  >();
}

export function useUIContextProviderProps(): IUIContextProviderProps {
  return {
    useLoader,
    useSuccessNotification,
    useErrorNotification,
    useErrorAlert,
    useWarningAlert,
    useConfirmation,
    useLayout,
    useForm,
    useModal,
    useModalForm,
  };
}

export const UIContextProvider = (props?: PropsWithChildren<Partial<IUIContextProviderProps>>) => {
  return <CoreUIContextProvider {...useUIContextProviderProps()} {...props} />;
};

export function UIContextConsumer(props: ConsumerProps<IUIContextProviderProps>) {
  return <UIContext.Consumer {...props} />;
}
