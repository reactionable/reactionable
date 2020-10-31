import React, { ComponentType, PropsWithChildren, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IError } from '../../error/IError';
import { INotificationProps } from './Notification';

export type IErrorNotificationProps = INotificationProps & {
  children?: IError;
};
export type ErrorNotificationComponent = ComponentType<IErrorNotificationProps>;

export type IUseErrorNotificationProps = PropsWithChildren<INotificationProps> & {
  children?: IError;
};

export interface IUseErrorNotificationResult {
  errorNotification: ReactNode;
  setErrorNotification: (error?: IError) => void;
}

export type IUseErrorNotification<P extends IUseErrorNotificationProps> = (
  props: P
) => IUseErrorNotificationResult;
export function useErrorNotification<P extends IUseErrorNotificationProps>({
  Component,
  title,
  ...props
}: P & { Component: ErrorNotificationComponent }): IUseErrorNotificationResult {
  const [errorNotification, setErrorNotification] = useState<IError | undefined>(undefined);
  const { t } = useTranslation();
  if (!title) {
    title = t('An error has occured');
  }
  return {
    errorNotification: (
      <>
        {errorNotification && (
          <Component
            {...props}
            title={title}
            children={errorNotification}
            onClose={() => setErrorNotification(undefined)}
          />
        )}
      </>
    ),
    setErrorNotification,
  };
}
