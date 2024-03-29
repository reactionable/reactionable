import { makeStyles } from "@material-ui/core";
import UiAlert, { AlertProps } from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import { IAlertProps as IAlertPropsCore } from "@reactionable/core/lib/ui/alert/Alert";
import {
  IUseAlertResult,
  useAlert as useAlertCore,
} from "@reactionable/core/lib/ui/alert/useAlert";
import { ComponentType, ReactNode } from "react";

import { IIconProps, Icon } from "../icon/Icon";

export type IAlertIconProps = IIconProps | AlertProps["icon"];

export type IAlertProps = IAlertPropsCore &
  Omit<AlertProps, "title" | "icon"> & { title?: ReactNode; icon?: IAlertIconProps };

export type AlertComponent = ComponentType<IAlertProps>;

const useStyles = makeStyles(() => ({
  message: {
    width: "100%",
  },
}));

export const Alert: AlertComponent = ({ children, title, icon, ...props }: IAlertProps) => {
  const classes = useStyles();

  let iconProp: AlertProps["icon"];

  if (!icon) {
    iconProp = icon;
  } else {
    iconProp = <Icon {...(icon as IIconProps)} fontSize="inherit" />;
  }

  return (
    <UiAlert icon={iconProp} classes={classes} {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </UiAlert>
  );
};

export const useAlert = (props?: IAlertProps): IUseAlertResult => {
  return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
