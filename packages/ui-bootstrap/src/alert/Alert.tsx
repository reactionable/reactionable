import { IAlertProps as IAlertPropsCore } from "@reactionable/core/lib/ui/alert/Alert";
import {
  IUseAlertResult,
  useAlert as useAlertCore,
} from "@reactionable/core/lib/ui/alert/useAlert";
import { ComponentType } from "react";
import BootstrapAlert, { AlertProps } from "react-bootstrap/Alert";

import { IIconProps, Icon } from "../icon/Icon";

export type IAlertProps = IAlertPropsCore &
  AlertProps & {
    icon?: IIconProps;
  };

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({ children, icon, ...props }: IAlertProps) => {
  return (
    <BootstrapAlert {...props}>
      {icon && <Icon className="me-2" {...icon} />}
      {children}
    </BootstrapAlert>
  );
};

export const useAlert = (props?: IAlertProps): IUseAlertResult => {
  return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
