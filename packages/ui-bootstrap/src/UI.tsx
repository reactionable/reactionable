import {
	UIContextProvider as CoreUIContextProvider,
	useUIContext as coreUseUIContext,
	type IUIProviderProps as ICoreUIContextProviderProps,
	useUIProviderProps as useCoreUIProviderProps,
} from "@reactionable/core";
import type { PropsWithChildren, ReactElement } from "react";

import { type IUseErrorAlertProps, useErrorAlert } from "./alert/ErrorAlert";
import {
	type IUseWarningAlertProps,
	useWarningAlert,
} from "./alert/WarningAlert";
import {
	type IUseConfirmationProps,
	useConfirmation,
} from "./confirmation/Confirmation";
import { useForm } from "./form/useForm";
import { useFormField } from "./form/useFormField";
import type { IUseLayoutProps } from "./layout/Layout";
import { useLayout } from "./layout/useLayout";
import { useLink } from "./link/Link";
import { type IUseLoaderProps, useLoader } from "./loader/Loader";
import { type IUseModalProps, useModal } from "./modal/Modal";
import { useModalForm } from "./modal/useModalForm";
import {
	type IUseErrorNotificationProps,
	useErrorNotification,
} from "./notification/ErrorNotification";
import {
	type IUseSuccessNotificationProps,
	useSuccessNotification,
} from "./notification/SuccessNotification";

export type IUIProviderProps = ICoreUIContextProviderProps<
	IUseLoaderProps,
	IUseSuccessNotificationProps,
	IUseErrorNotificationProps,
	IUseErrorAlertProps,
	IUseWarningAlertProps,
	IUseConfirmationProps,
	IUseLayoutProps,
	IUseModalProps
>;

export function useUIProviderProps(
	props?: Partial<IUIProviderProps>,
): IUIProviderProps {
	return useCoreUIProviderProps({
		useLoader,
		useSuccessNotification,
		useErrorNotification,
		useErrorAlert,
		useWarningAlert,
		useConfirmation,
		useLayout,
		useForm,
		useFormField,
		useModal,
		useModalForm,
		useLink,
		...props,
	});
}
export const UIContextProvider = (
	props?: PropsWithChildren<Partial<IUIProviderProps>>,
): ReactElement => {
	const uiContextProviderProps = {
		...useUIProviderProps(),
		...props,
	} as IUIProviderProps;

	return <CoreUIContextProvider {...uiContextProviderProps} />;
};

export function useUIContext(): IUIProviderProps {
	return coreUseUIContext();
}
