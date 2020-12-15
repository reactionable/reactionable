import { ReactElement } from "react";

import { IProviderProps, createProvider } from "../app/Provider";
import { Form, IFormData, IFormValues } from "../form/Form";
import { IFormButtonProps } from "../form/FormButton";
import { FormField } from "../form/FormField";
import { IUseFormProps, IUseFormResult, useForm } from "../form/useForm";
import { IUseFormFieldProps, IUseFormFieldResult, useFormField } from "../form/useFormField";
import { Alert } from "./alert/Alert";
import {
  ErrorAlert,
  IUseErrorAlertProps,
  IUseErrorAlertResult,
  useErrorAlert,
} from "./alert/ErrorAlert";
import {
  IUseWarningAlertProps,
  IUseWarningAlertResult,
  useWarningAlert,
} from "./alert/WarningAlert";
import {
  Confirmation,
  IUseConfirmationProps,
  IUseConfirmationResult,
  useConfirmation,
} from "./confirmation/Confirmation";
import { Body } from "./layout/body/Body";
import { Footer } from "./layout/footer/Footer";
import { Header } from "./layout/header/Header";
import { IUseLayoutProps, IUseLayoutResult, useLayout } from "./layout/Layout";
import { ILinkProps, useLink } from "./link/Link";
import { Loader } from "./loader/Loader";
import { IUseLoaderProps, IUseLoaderResult, useLoader } from "./loader/useLoader";
import { IModalProps, IUseModalProps, IUseModalResult, Modal, useModal } from "./modal/Modal";
import { IUseModalFormProps, useModalForm } from "./modal/useModalForm";
import {
  IUseErrorNotificationProps,
  IUseErrorNotificationResult,
  useErrorNotification,
} from "./notification/ErrorNotification";
import { Notification } from "./notification/Notification";
import {
  IUseSuccessNotificationProps,
  IUseSuccessNotificationResult,
  useSuccessNotification,
} from "./notification/SuccessNotification";
import { IFieldElementProps, IFormFieldValue } from "..";

export type IUIProviderProps<
  UseLoaderProps extends IUseLoaderProps = IUseLoaderProps,
  UseSuccessNotificationProps extends IUseSuccessNotificationProps = IUseSuccessNotificationProps,
  UseErrorNotificationProps extends IUseErrorNotificationProps = IUseErrorNotificationProps,
  UseErrorAlertProps extends IUseErrorAlertProps = IUseErrorAlertProps,
  UseWarningAlertProps extends IUseWarningAlertProps = IUseWarningAlertProps,
  UseConfirmationProps extends IUseConfirmationProps = IUseConfirmationProps,
  UseLayoutProps extends IUseLayoutProps = IUseLayoutProps,
  UseModalProps extends IUseModalProps = IUseModalProps
> = IProviderProps<{
  useLoader: <Props extends UseLoaderProps = UseLoaderProps>(props: Props) => IUseLoaderResult;
  useSuccessNotification: <Props extends UseSuccessNotificationProps = UseSuccessNotificationProps>(
    props: Props
  ) => IUseSuccessNotificationResult;
  useErrorNotification: <Props extends UseErrorNotificationProps = UseErrorNotificationProps>(
    props: Props
  ) => IUseErrorNotificationResult;
  useErrorAlert: <Props extends UseErrorAlertProps = UseErrorAlertProps>(
    props?: Props
  ) => IUseErrorAlertResult;
  useWarningAlert: <Props extends UseWarningAlertProps = UseWarningAlertProps>(
    props?: Props
  ) => IUseWarningAlertResult;
  useConfirmation: <Props extends UseConfirmationProps = UseConfirmationProps>(
    props: Props
  ) => IUseConfirmationResult;
  useLayout: <Props extends UseLayoutProps = UseLayoutProps>(props: Props) => IUseLayoutResult;
  useForm: <
    Values extends IFormValues,
    Data extends IFormData,
    FormButtonProps extends IFormButtonProps
  >(
    props: IUseFormProps<Values, Data, FormButtonProps>
  ) => IUseFormResult;
  useFormField: <
    FieldElementProps extends IFieldElementProps = IFieldElementProps,
    Value extends IFormFieldValue = IFormFieldValue
  >(
    props: IUseFormFieldProps<FieldElementProps, Value>
  ) => IUseFormFieldResult;
  useModal: <Props extends UseModalProps = UseModalProps>(props: Props) => IUseModalResult;
  useModalForm: <
    Values extends IFormValues = IFormValues,
    Data extends IFormData = IFormData,
    FormButtonProps extends IFormButtonProps = IFormButtonProps,
    ModalProps extends IModalProps = IModalProps
  >(
    props: IUseModalFormProps<Values, Data, FormButtonProps, ModalProps>
  ) => IUseModalResult;
  useLink: <LinkProps extends ILinkProps = ILinkProps>(props: LinkProps) => ReactElement;
}>;

export function useUIProviderProps(props?: Partial<IUIProviderProps>): IUIProviderProps {
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
    useFormField: (props) => useFormField({ Component: FormField, ...props }),
    useModal: (props) => useModal({ Component: Modal, ...props }),
    useModalForm,
    useLink,
    ...props,
  };
}

export const {
  Context: UIContext,
  ContextProvider: UIContextProvider,
  useContext: useUIContext,
} = createProvider<IUIProviderProps>(useUIProviderProps());
