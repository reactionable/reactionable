import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import createTheme, { Theme, ThemeOptions } from "@material-ui/core/styles/createTheme";
import {
  UIContextProvider as CoreUIContextProvider,
  IUIProviderProps as ICoreUIContextProviderProps,
  useUIContext as coreUseUIContext,
  useUIProviderProps as useCoreUIProviderProps,
} from "@reactionable/core/lib/ui/UI";
import { PropsWithChildren, ReactElement } from "react";

import { IUseErrorAlertProps, useErrorAlert } from "./alert/ErrorAlert";
import { IUseWarningAlertProps, useWarningAlert } from "./alert/WarningAlert";
import { IUseConfirmationProps, useConfirmation } from "./confirmation/Confirmation";
import { useForm } from "./form/useForm";
import { useFormField } from "./form/useFormField";
import { IUseLayoutProps, useLayout } from "./layout/Layout";
import { useLink } from "./link/Link";
import { IUseLoaderProps, useLoader } from "./loader/Loader";
import { IUseModalProps, useModal } from "./modal/Modal";
import { useModalForm } from "./modal/useModalForm";
import { IUseErrorNotificationProps, useErrorNotification } from "./notification/ErrorNotification";
import {
  IUseSuccessNotificationProps,
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
    <ThemeProvider theme={providerTheme}>
      {cssBaseline && <CssBaseline />}
      {children || <></>}
    </ThemeProvider>
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

export function useUIProviderProps(props?: Partial<IUIProviderProps>): IUIProviderProps {
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
  props?: PropsWithChildren<Partial<IUIProviderProps>>
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
