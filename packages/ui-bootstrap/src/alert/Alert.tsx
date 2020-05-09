import React, { FC } from 'react';
import BootstrapAlert, { AlertProps } from 'react-bootstrap/Alert';
import { useAlert as useAlertCore, IAlertProps as IAlertPropsCore } from '@reactionable/core';
import { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type IAlertProps = IAlertPropsCore &
  AlertProps & {
    icon?: FontAwesomeIconProps;
  };

export type AlertComponent = FC<IAlertProps>;

export const Alert: AlertComponent = ({ children, icon, ...props }) => {
  return (
    <BootstrapAlert {...props}>
      {icon && <FontAwesomeIcon className="mr-3" {...icon} />}
      {children}
    </BootstrapAlert>
  );
};

export const useAlert = (props?: IAlertProps) => {
  return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
