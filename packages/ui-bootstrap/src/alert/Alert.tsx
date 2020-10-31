import { IAlertProps as IAlertPropsCore } from '@reactionable/core/lib/ui/alert/Alert';
import { useAlert as useAlertCore } from '@reactionable/core/lib/ui/alert/useAlert';
import React, { ComponentType } from 'react';
import BootstrapAlert, { AlertProps } from 'react-bootstrap/Alert';

import { IIconProps, Icon } from '../icon/icon';

export type IAlertProps = IAlertPropsCore &
  AlertProps & {
    icon?: IIconProps;
  };

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({ children, icon, ...props }) => {
  return (
    <BootstrapAlert {...props}>
      {icon && <Icon className="mr-2" {...icon} />}
      {children}
    </BootstrapAlert>
  );
};

export const useAlert = (props?: IAlertProps) => {
  return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
