import UiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle/AlertTitle';
import { IAlertProps as IAlertPropsCore } from '@reactionable/core/lib/ui/alert/Alert';
import { useAlert as useAlertCore } from '@reactionable/core/lib/ui/alert/useAlert';
import React, { ComponentType, ReactNode } from 'react';

export type IAlertProps = IAlertPropsCore & Omit<AlertProps, 'title'> & { title?: ReactNode };

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({ children, title, ...props }) => {
  return (
    <UiAlert {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </UiAlert>
  );
};

export const useAlert = (props?: IAlertProps) => {
  return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
