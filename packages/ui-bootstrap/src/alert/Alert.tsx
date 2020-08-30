import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IAlertProps as IAlertPropsCore } from '@reactionable/core/lib/ui/alert/Alert';
import { useAlert as useAlertCore } from '@reactionable/core/lib/ui/alert/useAlert';
import React, { FC } from 'react';
import BootstrapAlert, { AlertProps } from 'react-bootstrap/Alert';

export type IAlertProps = IAlertPropsCore &
  AlertProps & {
    icon?: FontAwesomeIconProps;
  };

export type AlertComponent = FC<IAlertProps>;

export const Alert: AlertComponent = ({ children, icon, ...props }) => {
  return (
    <BootstrapAlert {...props}>
      {icon && <FontAwesomeIcon className="mr-2" {...icon} />}
      {children}
    </BootstrapAlert>
  );
};

export const useAlert = (props?: IAlertProps) => {
  return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
