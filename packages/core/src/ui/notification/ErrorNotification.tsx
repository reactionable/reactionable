import React, { ComponentType, PropsWithChildren, ReactElement, ReactNode, useState } from "react";

import { IError, printError } from "../../error/IError";
import { useTranslation } from "../../i18n/I18n";
import { INotificationProps, Notification } from "./Notification";

export type IErrorNotificationProps = INotificationProps & {
  children?: IError;
};
export type ErrorNotificationComponent = ComponentType<IErrorNotificationProps>;

export function ErrorNotification({ children, ...props }: IErrorNotificationProps): ReactElement {
  return <Notification {...props}>{printError(children)}</Notification>;
}

export type IUseErrorNotificationProps = PropsWithChildren<INotificationProps> & {
  children?: IError;
  Component?: ErrorNotificationComponent;
};

export interface IUseErrorNotificationResult {
  errorNotification: ReactNode;
  setErrorNotification: (error?: IError) => void;
}

export type IUseErrorNotification<UseErrorNotificationProps extends IUseErrorNotificationProps> = (
  props: UseErrorNotificationProps
) => IUseErrorNotificationResult;

export function useErrorNotification<UseErrorNotificationProps extends IUseErrorNotificationProps>({
  Component,
  title,
  ...props
}: UseErrorNotificationProps): IUseErrorNotificationResult {
  const [errorNotification, setErrorNotification] = useState<IError | undefined>(undefined);
  const { t } = useTranslation();
  if (!title) {
    title = t("An error has occured");
  }

  if (!Component) {
    Component = ErrorNotification;
  }

  return {
    errorNotification: errorNotification ? (
      <Component {...props} title={title} onClose={() => setErrorNotification(undefined)}>
        {errorNotification}
      </Component>
    ) : undefined,
    setErrorNotification,
  };
}
