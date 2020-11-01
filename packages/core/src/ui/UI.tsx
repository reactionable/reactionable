import { IProviderProps, createProvider } from '../app/Provider';
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

export type IUIProviderProps<
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
> = IProviderProps<{
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
}>;

export function useUIProviderProps(): IUIProviderProps {
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

export const {
  Context: UIContext,
  ContextProvider: UIContextProvider,
  useContext: useUIContext,
} = createProvider<IUIProviderProps>(useUIProviderProps());
