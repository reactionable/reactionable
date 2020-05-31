import React, { useContext, createContext, PropsWithChildren } from 'react';
import { useLoader, IUseLoader, IUseLoaderProps, Loader } from './loader/Loader';
import { Notification } from './notification/Notification';
import {
  IUseSuccessNotification,
  useSuccessNotification,
  IUseSuccessNotificationProps,
} from './notification/SuccessNotification';
import {
  IUseErrorNotification,
  useErrorNotification,
  IUseErrorNotificationProps,
} from './notification/ErrorNotification';
import { IUseErrorAlert, useErrorAlert, IUseErrorAlertProps, ErrorAlert } from './alert/ErrorAlert';
import { IUseWarningAlert, useWarningAlert, IUseWarningAlertProps } from './alert/WarningAlert';
import {
  IUseConfirmationProps,
  useConfirmation,
  IUseConfirmation,
  Confirmation,
} from './confirmation/Confirmation';
import { IUseLayoutProps, useLayout, IUseLayout } from './layout/Layout';
import { useModal, Modal, IUseModalProps, IUseModal } from './modal/Modal';
import { Alert } from './alert/Alert';
import { Form, IUseFormProps, IUseForm, useForm } from '../form/Form';
import { Header } from './layout/header/Header';
import { Body } from './layout/body/Body';
import { Footer } from './layout/footer/Footer';
import { IUseModalFormProps, IUseModalForm, useModalForm } from './modal/ModalForm';

export type IUIContext<
  LO extends IUseLoaderProps = IUseLoaderProps,
  SN extends IUseSuccessNotificationProps = IUseSuccessNotificationProps,
  EN extends IUseErrorNotificationProps = IUseErrorNotificationProps,
  EA extends IUseErrorAlertProps = IUseErrorAlertProps,
  WA extends IUseWarningAlertProps = IUseWarningAlertProps,
  CO extends IUseConfirmationProps = IUseConfirmationProps,
  LA extends IUseLayoutProps = IUseLayoutProps,
  FO extends IUseFormProps = IUseFormProps,
  MO extends IUseModalProps = IUseModalProps,
  MF extends IUseModalFormProps = IUseModalFormProps
> = {
  useLoader: IUseLoader<LO>;
  useSuccessNotification: IUseSuccessNotification<SN>;
  useErrorNotification: IUseErrorNotification<EN>;
  useErrorAlert: IUseErrorAlert<EA>;
  useWarningAlert: IUseWarningAlert<WA>;
  useConfirmation: IUseConfirmation<CO>;
  useLayout: IUseLayout<LA>;
  useForm: IUseForm<FO>;
  useModal: IUseModal<MO>;
  useModalForm: IUseModalForm<MF>;
};

export const UIContext = createContext<
  IUIContext<any, any, any, any, any, any, any, any, any, any>
>({
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
});

export type IUIContextProviderProps<
  LO extends IUseLoaderProps = IUseLoaderProps,
  SN extends IUseSuccessNotificationProps = IUseSuccessNotificationProps,
  EN extends IUseErrorNotificationProps = IUseErrorNotificationProps,
  EA extends IUseErrorAlertProps = IUseErrorAlertProps,
  WA extends IUseWarningAlertProps = IUseWarningAlertProps,
  CO extends IUseConfirmationProps = IUseConfirmationProps,
  LA extends IUseLayoutProps = IUseLayoutProps,
  FO extends IUseFormProps = IUseFormProps,
  MO extends IUseModalProps = IUseModalProps,
  MF extends IUseModalFormProps = IUseModalFormProps
> = PropsWithChildren<IUIContext<LO, SN, EN, EA, WA, CO, LA, FO, MO, MF>>;

export function UIContextProvider<
  LO extends IUseLoaderProps,
  SN extends IUseSuccessNotificationProps,
  EN extends IUseErrorNotificationProps,
  EA extends IUseErrorAlertProps,
  WA extends IUseWarningAlertProps,
  CO extends IUseConfirmationProps,
  LA extends IUseLayoutProps,
  FO extends IUseFormProps,
  MO extends IUseModalProps,
  MF extends IUseModalFormProps
>(
  props?: PropsWithChildren<
    Partial<IUIContextProviderProps<LO, SN, EN, EA, WA, CO, LA, FO, MO, MF>>
  >
) {
  return (
    <UIContext.Provider
      value={{
        ...useUIContextProviderProps(),
        ...props,
      }}
      children={props?.children}
    />
  );
}

export function useUIContext<
  LO extends IUseLoaderProps,
  SN extends IUseSuccessNotificationProps,
  EN extends IUseErrorNotificationProps,
  EA extends IUseErrorAlertProps,
  WA extends IUseWarningAlertProps,
  CO extends IUseConfirmationProps,
  LA extends IUseLayoutProps,
  FO extends IUseFormProps,
  MO extends IUseModalProps,
  MF extends IUseModalFormProps
>() {
  return useContext<IUIContext<LO, SN, EN, EA, WA, CO, LA, FO, MO, MF>>(UIContext);
}

export function useUIContextProviderProps(): IUIContextProviderProps {
  return {
    useLoader: (props) => useLoader({ Component: Loader, ...props }),
    useSuccessNotification: (props) =>
      useSuccessNotification({ Component: Notification, ...props }),
    useErrorNotification: (props) => useErrorNotification({ Component: Loader, ...props }),
    useErrorAlert: (props) => useErrorAlert({ Component: ErrorAlert, ...props }),
    useWarningAlert: (props) => useWarningAlert({ Component: Alert, ...props }),
    useConfirmation: (props) => useConfirmation({ Component: Confirmation, ...props }),
    useLayout: (props) =>
      useLayout({
        ...props,
        HeaderComponent: Header,
        BodyComponent: Body,
        FooterComponent: Footer,
      }),
    useForm: (props) => useForm({ Component: Form, ...props }),
    useModal: (props) => useModal({ Component: Modal, ...props }),
    useModalForm,
  };
}
