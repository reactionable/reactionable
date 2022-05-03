import { ComponentType, PropsWithChildren } from "react";

export type IAlertProps = PropsWithChildren<unknown>;

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({ children }: IAlertProps) => {
  return <div>{children}</div>;
};
