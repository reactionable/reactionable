import UiAlert, { AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  IAlertProps as IAlertPropsCore,
  IUseAlertResult,
  useAlert as useAlertCore,
} from "@reactionable/core";
import { ComponentType, ReactNode } from "react";

import { IIconProps, Icon } from "../icon/Icon";

export type IAlertIconProps = IIconProps | AlertProps["icon"];

export type IAlertProps = IAlertPropsCore &
  Omit<AlertProps, "title" | "icon"> & { title?: ReactNode; icon?: IAlertIconProps };

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({ children, title, icon, ...props }: IAlertProps) => {
  let iconProp: AlertProps["icon"];

  if (!icon) {
    iconProp = icon;
  } else {
    iconProp = <Icon {...(icon as IIconProps)} fontSize="inherit" />;
  }

  return (
    <UiAlert icon={iconProp} {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </UiAlert>
  );
};

export const useAlert = (props?: IAlertProps): IUseAlertResult => {
  return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
