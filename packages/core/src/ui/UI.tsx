import React, { ConsumerProps, PropsWithChildren, createContext, useContext } from 'react';

import { Form, IUseForm, IUseFormProps, useForm } from '../form/Form';
import { Alert } from './alert/Alert';
import { ErrorAlert, IUseErrorAlert, IUseErrorAlertProps, useErrorAlert } from './alert/ErrorAlert';
import { IUseWarningAlert, IUseWarningAlertProps, useWarningAlert } from './alert/WarningAlert';
import {
  Confirmation,
  IUseConfirmation,
  IUseConfirmationProps,
  useConfirmation,
} from './confirmation/Confirmation';
import { Body } from './layout/body/Body';
import { Footer } from './layout/footer/Footer';
import { Header } from './layout/header/Header';
import { IUseLayout, IUseLayoutProps, useLayout } from './layout/Layout';
import { Loader } from './loader/Loader';
import { IUseLoader, IUseLoaderProps, useLoader } from './loader/useLoader';
import { IUseModal, IUseModalProps, Modal, useModal } from './modal/Modal';
import { IUseModalForm, IUseModalFormProps, useModalForm } from './modal/useModalForm';
import {
  IUseErrorNotification,
  IUseErrorNotificationProps,
  useErrorNotification,
} from './notification/ErrorNotification';
import { Notification } from './notification/Notification';
import {
  IUseSuccessNotification,
  IUseSuccessNotificationProps,
  useSuccessNotification,
} from './notification/SuccessNotification';

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

export function UIContextConsumer<
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
>(props: ConsumerProps<IUIContextProviderProps<LO, SN, EN, EA, WA, CO, LA, FO, MO, MF>>) {
  return <UIContext.Consumer {...props} />;
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
    useErrorNotification: (props) => useErrorNotification({ Component: Notification, ...props }),
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
