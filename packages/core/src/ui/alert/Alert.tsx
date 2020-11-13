import React, { ComponentType, PropsWithChildren, ReactNode } from "react";

export type IAlertProps = { children?: ReactNode };

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({ children }: PropsWithChildren<IAlertProps>) => {
  return <div>{children}</div>;
};
