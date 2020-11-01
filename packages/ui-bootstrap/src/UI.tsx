import { IUseLoaderProps } from '@reactionable/core/lib/ui/loader/useLoader';
import {
  UIContextProvider as CoreUIContextProvider,
  IUIProviderProps as ICoreUIContextProviderProps,
  useUIProviderProps as useCoreUIProviderProps,
} from '@reactionable/core/lib/ui/UI';
import React, { PropsWithChildren } from 'react';

import { IUseErrorAlertProps, useErrorAlert } from './alert/ErrorAlert';
import { IUseWarningAlertProps, useWarningAlert } from './alert/WarningAlert';
import { IUseConfirmationProps, useConfirmation } from './confirmation/Confirmation';
import { IUseFormProps, useForm } from './form/Form';
import { IUseLayoutProps, useLayout } from './layout/Layout';
import { useLoader } from './loader/Loader';
import { IUseModalProps, useModal } from './modal/Modal';
import { IUseModalFormProps, useModalForm } from './modal/useModalForm';
import { IUseErrorNotificationProps, useErrorNotification } from './notification/ErrorNotification';
import {
  IUseSuccessNotificationProps,
  useSuccessNotification,
} from './notification/SuccessNotification';

export type IUIProviderProps = ICoreUIContextProviderProps<
  IUseLoaderProps,
  IUseSuccessNotificationProps,
  IUseErrorNotificationProps,
  IUseErrorAlertProps,
  IUseWarningAlertProps,
  IUseConfirmationProps,
  IUseLayoutProps,
  IUseFormProps,
  IUseModalProps,
  IUseModalFormProps
>;

export function useUIProviderProps(): IUIProviderProps {
  return {
    ...useCoreUIProviderProps(),
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
  };
}

export const UIContextProvider = (props?: PropsWithChildren<Partial<IUIProviderProps>>) => {
  return <CoreUIContextProvider {...useUIProviderProps()} {...props} />;
};
