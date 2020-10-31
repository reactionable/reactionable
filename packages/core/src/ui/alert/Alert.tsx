import React, { ComponentType } from 'react';

export type IAlertProps = {};

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({ children }) => {
  return <div>{children}</div>;
};
