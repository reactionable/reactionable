import React, { FC, PropsWithChildren, ReactElement, useState, useEffect } from 'react';
import { useUIContext } from '../UI';
import { EnhanceChildren } from '../../enhance-children/EnhanceChildren';
import { useTranslation } from 'react-i18next';

export type IConfirmationProps = {
  title: string;
  callback: (confirm: boolean) => void;
};

export type ConfirmationComponent = FC<IConfirmationProps>;

export const Confirmation: ConfirmationComponent = ({ callback, children, title }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{title || t('Confirm ?')}</div>
      <div>{children}</div>
      <div>
        <button onClick={() => callback(false)}>{t('Cancel')} </button>
        <button onClick={() => callback(true)}>{t('OK')}</button>
      </div>
    </div>
  );
};

export type IUseConfirmationProps = PropsWithChildren<IConfirmationProps>;

export interface IUseConfirmationResult {
  confirmation: ReactElement;
  setConfirmation: (confirmation: boolean) => void;
}

export type IUseConfirmation<P extends IUseConfirmationProps> = (
  props: P
) => IUseConfirmationResult;
export function useConfirmation<P extends IUseConfirmationProps>({
  Component,
  callback,
  ...props
}: P & { Component: ConfirmationComponent }): IUseConfirmationResult {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const confirmCallback = (confirm: boolean) => {
    setConfirmation(false);
    callback(confirm);
  };

  return {
    confirmation: <>{confirmation && <Component callback={confirmCallback} {...props} />}</>,
    setConfirmation,
  };
}

export interface IConfirmationActionProps<Data> {
  title: string;
  successMessage: string;
  confirmationMessage: string;
  onConfirm: () => Promise<Data>;
  onSuccess?: (result: Data) => void;
}

export type ConfirmationActionComponent<Data> = FC<IConfirmationActionProps<Data>>;

export function ConfirmationAction<Data>(props: PropsWithChildren<IConfirmationActionProps<Data>>) {
  const {
    useLoader,
    useSuccessNotification,
    useErrorNotification,
    useConfirmation,
  } = useUIContext();

  const { loader, isLoading, setLoading } = useLoader({});
  const { successNotification, setSuccessNotification } = useSuccessNotification({
    title: props.title,
  });
  const { errorNotification, setErrorNotification } = useErrorNotification({ title: props.title });

  const { onSuccess } = props;
  const [success, setSuccess] = useState<Data>();

  useEffect(() => {
    if (success && onSuccess) {
      setSuccess(undefined);
      onSuccess(success);
    }
  }, [success, onSuccess]);

  const { confirmation, setConfirmation } = useConfirmation({
    title: props.title,
    children: props.confirmationMessage,
    callback: async (confirm: boolean) => {
      if (!confirm) {
        setSuccessNotification(undefined);
        setSuccess(undefined);
        return;
      }
      setLoading(true);

      try {
        const data = await props.onConfirm();
        setLoading(false);
        setErrorNotification(undefined);
        setSuccessNotification(props.successMessage);
        setSuccess(data);
      } catch (error) {
        setLoading(false);
        setSuccessNotification(undefined);
        setErrorNotification(error);
      }
    },
  });

  const onClick = () => {
    setErrorNotification(undefined);
    setSuccessNotification(undefined);
    setSuccess(undefined);
    setConfirmation(true);
  };

  return (
    <>
      <EnhanceChildren children={props.children} enhance={{ onClick, disabled: isLoading }} />
      {successNotification}
      {errorNotification}
      {confirmation}
      {loader}
    </>
  );
}
