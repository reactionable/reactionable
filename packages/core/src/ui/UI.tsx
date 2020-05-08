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
import { IUseErrorAlert, useErrorAlert, IUseErrorAlertProps } from './alert/ErrorAlert';
import { IUseWarningAlert, useWarningAlert, IUseWarningAlertProps } from './alert/WarningAlert';
import {
  IUseConfirmationProps,
  useConfirmation,
  IUseConfirmation,
  Confirmation,
} from './confirmation/Confirmation';
import { IUseLayoutProps, useLayout, IUseLayout } from './layout/Layout';
import { useModal, Modal } from './modal/Modal';
import { IUseModalForm, IUseModalFormProps, useModalForm } from './modal/ModalForm';
import { Alert } from './alert/Alert';
import { Form } from '../form/Form';
import { Header } from './layout/header/Header';
import { Body } from './layout/body/Body';
import { Footer } from './layout/footer/Footer';

export type IUIContext<
  LO extends IUseLoaderProps = IUseLoaderProps,
  SN extends IUseSuccessNotificationProps = IUseSuccessNotificationProps,
  EN extends IUseErrorNotificationProps = IUseErrorNotificationProps,
  EA extends IUseErrorAlertProps = IUseErrorAlertProps,
  WA extends IUseWarningAlertProps = IUseWarningAlertProps,
  CO extends IUseConfirmationProps = IUseConfirmationProps,
  LA extends IUseLayoutProps = IUseLayoutProps,
  MF extends IUseModalFormProps = IUseModalFormProps
> = {
  useLoader: IUseLoader<LO>;
  useSuccessNotification: IUseSuccessNotification<SN>;
  useErrorNotification: IUseErrorNotification<EN>;
  useErrorAlert: IUseErrorAlert<EA>;
  useWarningAlert: IUseWarningAlert<WA>;
  useConfirmation: IUseConfirmation<CO>;
  useLayout: IUseLayout<LA>;
  useModalForm: IUseModalForm<MF>;
};

export const UIContext = createContext<IUIContext<any, any, any, any, any, any, any, any>>({
  useLoader,
  useSuccessNotification,
  useErrorNotification,
  useErrorAlert,
  useWarningAlert,
  useConfirmation,
  useLayout,
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
  MF extends IUseModalFormProps = IUseModalFormProps
> = PropsWithChildren<IUIContext<LO, SN, EN, EA, WA, CO, LA, MF>>;

export function UIContextProvider<
  LO extends IUseLoaderProps,
  SN extends IUseSuccessNotificationProps,
  EN extends IUseErrorNotificationProps,
  EA extends IUseErrorAlertProps,
  WA extends IUseWarningAlertProps,
  CO extends IUseConfirmationProps,
  LA extends IUseLayoutProps,
  MF extends IUseModalFormProps
>(props: IUIContextProviderProps<LO, SN, EN, EA, WA, CO, LA, MF>) {
  return <UIContext.Provider value={props}>{props.children}</UIContext.Provider>;
}

export function useUIContext<
  LO extends IUseLoaderProps,
  SN extends IUseSuccessNotificationProps,
  EN extends IUseErrorNotificationProps,
  EA extends IUseErrorAlertProps,
  WA extends IUseWarningAlertProps,
  CO extends IUseConfirmationProps,
  LA extends IUseLayoutProps,
  MF extends IUseModalFormProps
>() {
  return useContext<IUIContext<LO, SN, EN, EA, WA, CO, LA, MF>>(UIContext);
}

export function useUIContextProviderProps(): IUIContextProviderProps {
  return {
    useLoader: (props) => useLoader({ Component: Loader, ...props }),
    useSuccessNotification: (props) =>
      useSuccessNotification({ Component: Notification, ...props }),
    useErrorNotification: (props) => useErrorNotification({ Component: Loader, ...props }),
    useErrorAlert: (props) => useErrorAlert({ Component: Alert, ...props }),
    useWarningAlert: (props) => useWarningAlert({ Component: Alert, ...props }),
    useConfirmation: (props) => useConfirmation({ Component: Confirmation, ...props }),
    useLayout: (props) =>
      useLayout({
        ...props,
        HeaderComponent: Header,
        BodyComponent: Body,
        FooterComponent: Footer,
      }),
    useModalForm: (props) =>
      useModalForm({
        FormComponent: Form,
        useModal: (modalProps) => useModal({ Component: Modal, ...modalProps }),
        ...props,
      }),
  };
}
