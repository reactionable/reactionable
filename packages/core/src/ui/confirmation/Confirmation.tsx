import {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { EnhanceChildren } from "../../enhance-children/EnhanceChildren";
import { IError } from "../../error/IError";
import { useTranslation } from "../../i18n/I18n";
import { useUIContext } from "../UI";

export type IConfirmationProps = {
  title: string;
  callback: (confirm: boolean) => void;
};

export type ConfirmationComponent = ComponentType<IConfirmationProps>;

export const Confirmation: ConfirmationComponent = ({
  callback,
  children,
  title,
}: PropsWithChildren<IConfirmationProps>) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{title || t("Confirm ?")}</div>
      <div>{children}</div>
      <div>
        <button onClick={() => callback(false)}>{t("Cancel")} </button>
        <button onClick={() => callback(true)}>{t("OK")}</button>
      </div>
    </div>
  );
};

export type IUseConfirmationProps = PropsWithChildren<
  IConfirmationProps & { Component?: ConfirmationComponent }
>;

export interface IUseConfirmationResult {
  confirmation: ReactNode;
  setConfirmation: (confirmation: boolean) => void;
}

export type IUseConfirmation<UseConfirmationProps extends IUseConfirmationProps> = (
  props: UseConfirmationProps
) => IUseConfirmationResult;

export function useConfirmation<UseConfirmationProps extends IUseConfirmationProps>({
  Component,
  callback,
  ...props
}: UseConfirmationProps): IUseConfirmationResult {
  if (!Component) {
    Component = Confirmation;
  }
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const confirmCallback = (confirm: boolean) => {
    setConfirmation(false);
    callback(confirm);
  };

  return {
    confirmation: confirmation ? <Component callback={confirmCallback} {...props} /> : null,
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

export type ConfirmationActionComponent<Data> = ComponentType<IConfirmationActionProps<Data>>;

export function ConfirmationAction<Data>(
  props: PropsWithChildren<IConfirmationActionProps<Data>>
): ReactElement {
  const {
    useLoader,
    useSuccessNotification,
    useErrorNotification,
    useConfirmation,
  } = useUIContext();

  const { loader, loading, setLoading } = useLoader({});
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
        setErrorNotification(error as IError);
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
      <EnhanceChildren enhance={{ onClick, disabled: loading }}>{props.children}</EnhanceChildren>
      {successNotification}
      {errorNotification}
      {confirmation}
      {loader}
    </>
  );
}
