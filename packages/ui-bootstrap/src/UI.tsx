import React, { PropsWithChildren } from 'react';
import {
  IUIContextProviderProps as ICoreUIContextProviderProps,
  UIContextProvider as CoreUIContextProvider,
  IUseLoaderProps,
  useUIContext as useCoreUIContext,
} from '@reactionable/core';
import { useLoader } from './loader/Loader';
import {
  useSuccessNotification,
  IUseSuccessNotificationProps,
} from './notification/SuccessNotification';
import { useErrorNotification, IUseErrorNotificationProps } from './notification/ErrorNotification';
import { useErrorAlert, IUseErrorAlertProps } from './alert/ErrorAlert';
import { useWarningAlert, IUseWarningAlertProps } from './alert/WarningAlert';
import { useConfirmation, IUseConfirmationProps } from './confirmation/Confirmation';
import { useLayout, IUseLayoutProps } from './layout/Layout';
import { useModalForm, IUseModalFormProps } from './modal/ModalForm';
import { useModal, IUseModalProps } from './modal/Modal';
import { useForm, IUseFormProps } from './form/Form';

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
