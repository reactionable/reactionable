import type { ReactElement } from "react";
import type { IFieldElementProps, IFormFieldValue } from "..";
import { createProvider, type IProviderProps } from "../app/Provider";
import { Form, type IFormData, type IFormValues } from "../form/Form";
import type { IFormButtonProps } from "../form/FormButton";
import { FormField } from "../form/FormField";
import {
	type IUseFormProps,
	type IUseFormResult,
	useForm,
} from "../form/useForm";
import {
	type IUseFormFieldProps,
	type IUseFormFieldResult,
	useFormField,
} from "../form/useFormField";
import { Alert } from "./alert/Alert";
import {
	ErrorAlert,
	type IUseErrorAlertProps,
	type IUseErrorAlertResult,
	useErrorAlert,
} from "./alert/ErrorAlert";
import {
	type IUseWarningAlertProps,
	type IUseWarningAlertResult,
	useWarningAlert,
} from "./alert/WarningAlert";
import {
	Confirmation,
	type IUseConfirmationProps,
	type IUseConfirmationResult,
	useConfirmation,
} from "./confirmation/Confirmation";
import { Body } from "./layout/body/Body";
import { Footer } from "./layout/footer/Footer";
import { Header } from "./layout/header/Header";
import {
	type IUseLayoutProps,
	type IUseLayoutResult,
	useLayout,
} from "./layout/useLayout";
import { type ILinkProps, useLink } from "./link/Link";
import { Loader } from "./loader/Loader";
import {
	type IUseLoaderProps,
	type IUseLoaderResult,
	useLoader,
} from "./loader/useLoader";
import {
	type IModalProps,
	type IUseModalProps,
	type IUseModalResult,
	Modal,
	useModal,
} from "./modal/Modal";
import { type IUseModalFormProps, useModalForm } from "./modal/useModalForm";
import {
	type IUseErrorNotificationProps,
	type IUseErrorNotificationResult,
	useErrorNotification,
} from "./notification/ErrorNotification";
import { Notification } from "./notification/Notification";
import {
	type IUseSuccessNotificationProps,
	type IUseSuccessNotificationResult,
	useSuccessNotification,
} from "./notification/SuccessNotification";

export type IUIProviderProps<
	UseLoaderProps extends IUseLoaderProps = IUseLoaderProps,
	UseSuccessNotificationProps extends
		IUseSuccessNotificationProps = IUseSuccessNotificationProps,
	UseErrorNotificationProps extends
		IUseErrorNotificationProps = IUseErrorNotificationProps,
	UseErrorAlertProps extends IUseErrorAlertProps = IUseErrorAlertProps,
	UseWarningAlertProps extends IUseWarningAlertProps = IUseWarningAlertProps,
	UseConfirmationProps extends IUseConfirmationProps = IUseConfirmationProps,
	UseLayoutProps extends IUseLayoutProps = IUseLayoutProps,
	UseModalProps extends IUseModalProps = IUseModalProps,
> = IProviderProps<{
	useLoader: <Props extends UseLoaderProps = UseLoaderProps>(
		props?: Props,
	) => IUseLoaderResult;
	useSuccessNotification: <
		Props extends UseSuccessNotificationProps = UseSuccessNotificationProps,
	>(
		props: Props,
	) => IUseSuccessNotificationResult;
	useErrorNotification: <
		Props extends UseErrorNotificationProps = UseErrorNotificationProps,
	>(
		props: Props,
	) => IUseErrorNotificationResult;
	useErrorAlert: <Props extends UseErrorAlertProps = UseErrorAlertProps>(
		props?: Props,
	) => IUseErrorAlertResult;
	useWarningAlert: <Props extends UseWarningAlertProps = UseWarningAlertProps>(
		props?: Props,
	) => IUseWarningAlertResult;
	useConfirmation: <Props extends UseConfirmationProps = UseConfirmationProps>(
		props: Props,
	) => IUseConfirmationResult;
	useLayout: <Props extends UseLayoutProps = UseLayoutProps>(
		props: Props,
	) => IUseLayoutResult;
	useForm: <
		Values extends IFormValues,
		Data extends IFormData,
		FormButtonProps extends IFormButtonProps,
	>(
		props: IUseFormProps<Values, Data, FormButtonProps>,
	) => IUseFormResult;
	useFormField: <
		FieldElementProps extends IFieldElementProps = IFieldElementProps,
		Value extends IFormFieldValue = IFormFieldValue,
	>(
		props: IUseFormFieldProps<FieldElementProps, Value>,
	) => IUseFormFieldResult;
	useModal: <Props extends UseModalProps = UseModalProps>(
		props: Props,
	) => IUseModalResult;
	useModalForm: <
		Values extends IFormValues = IFormValues,
		Data extends IFormData = IFormData,
		FormButtonProps extends IFormButtonProps = IFormButtonProps,
		ModalProps extends IModalProps = IModalProps,
	>(
		props: IUseModalFormProps<Values, Data, FormButtonProps, ModalProps>,
	) => IUseModalResult;
	useLink: <LinkProps extends ILinkProps = ILinkProps>(
		props: LinkProps,
	) => ReactElement;
}>;

export function useUIProviderProps(
	props?: Partial<IUIProviderProps>,
): IUIProviderProps {
	return {
		useLoader: (props) => useLoader({ Component: Loader, ...props }),
		useSuccessNotification: (props) =>
			useSuccessNotification({ Component: Notification, ...props }),
		useErrorNotification: (props) =>
			useErrorNotification({ Component: Notification, ...props }),
		useErrorAlert: (props) =>
			useErrorAlert({ Component: ErrorAlert, ...props }),
		useWarningAlert: (props) => useWarningAlert({ Component: Alert, ...props }),
		useConfirmation: (props) =>
			useConfirmation({ Component: Confirmation, ...props }),
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
