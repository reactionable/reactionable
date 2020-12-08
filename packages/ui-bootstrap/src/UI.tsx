import {
  UIContextProvider as CoreUIContextProvider,
  IUIProviderProps as ICoreUIContextProviderProps,
  useUIContext as coreUseUIContext,
  useUIProviderProps as useCoreUIProviderProps,
} from "@reactionable/core/lib/ui/UI";
import React, { PropsWithChildren, ReactElement } from "react";

import { IUseErrorAlertProps, useErrorAlert } from "./alert/ErrorAlert";
import { IUseWarningAlertProps, useWarningAlert } from "./alert/WarningAlert";
import { IUseConfirmationProps, useConfirmation } from "./confirmation/Confirmation";
import { useForm } from "./form/useForm";
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

export function useUIProviderProps(props?: Partial<IUIProviderProps>): IUIProviderProps {
  return useCoreUIProviderProps({
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
    useLink,
    ...props,
  });
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
