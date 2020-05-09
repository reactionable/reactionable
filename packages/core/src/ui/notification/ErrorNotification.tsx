import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { IError } from '../../error/IError';
import { INotificationProps } from './Notification';

export type IErrorNotificationProps = INotificationProps & {
  children?: IError;
};
export type ErrorNotificationComponent = FC<IErrorNotificationProps>;

export type IUseErrorNotificationProps = PropsWithChildren<INotificationProps> & {
  children?: IError;
};

export interface IUseErrorNotificationResult {
  errorNotification: ReactElement;
  setErrorNotification: (error?: IError) => void;
}

export type IUseErrorNotification<P extends IUseErrorNotificationProps> = (
  props: P
) => IUseErrorNotificationResult;
export function useErrorNotification<P extends IUseErrorNotificationProps>({
  Component,
  ...props
}: P & { Component: ErrorNotificationComponent }): IUseErrorNotificationResult {
  const [errorNotification, setErrorNotification] = useState<IError | undefined>(undefined);
  return {
    errorNotification: (
      <>
        {errorNotification && (
          <Component
            {...props}
            children={errorNotification}
            onClose={() => setErrorNotification(undefined)}
          />
        )}
      </>
    ),
    setErrorNotification,
  };
}
