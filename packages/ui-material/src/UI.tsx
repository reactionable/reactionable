import CssBaseline from "@mui/material/CssBaseline";
import {
	createTheme,
	StyledEngineProvider,
	type Theme,
	type ThemeOptions,
	ThemeProvider,
} from "@mui/material/styles";
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
import { type IUseLayoutProps, useLayout } from "./layout/Layout";
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

export type IUIComponentProps = PropsWithChildren<{
	theme?: Theme | ThemeOptions;
	cssBaseline?: boolean;
}>;

export function UIComponent({
	children,
	theme = {},
	cssBaseline = true,
}: IUIComponentProps): ReactElement {
	const providerTheme = createTheme(theme);
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={providerTheme}>
				{cssBaseline && <CssBaseline />}
				{children ?? null}
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export type IUIProviderProps = ICoreUIContextProviderProps<
	IUseLoaderProps,
	IUseSuccessNotificationProps,
	IUseErrorNotificationProps,
	IUseErrorAlertProps,
	IUseWarningAlertProps,
	IUseConfirmationProps,
	IUseLayoutProps,
	IUseModalProps
> &
	IUIComponentProps;

export function useUIProviderProps(
	props?: Partial<IUIProviderProps>,
): IUIProviderProps {
	return useCoreUIProviderProps({
		Component: UIComponent,
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
	} as IUIProviderProps);
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
