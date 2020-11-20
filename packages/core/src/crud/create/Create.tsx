import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

import { EnhanceChildren } from "../../enhance-children/EnhanceChildren";
import { IFormData, IFormValues } from "../../form/Form";
import { IFormButtonProps } from "../../form/FormButton";
import { IUseFormProps } from "../../form/useForm";
import { IModalProps } from "../../ui/modal/Modal";
import { IUseModalFormProps } from "../../ui/modal/useModalForm";
import { useUIContext } from "../../ui/UI";

export type FormInModal<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
> = Omit<IUseModalFormProps<Values, Data, FormButtonProps, ModalProps>, "form" | "title"> | true;

export interface ICreateProps<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps,
  ModalProps extends IModalProps = IModalProps
> {
  modal?: FormInModal<Values, Data, FormButtonProps, ModalProps>;
  form: IUseFormProps<Values, Data, FormButtonProps>;
}

export type CreateComponent<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
> = ComponentType<ICreateProps<Values, Data, FormButtonProps, ModalProps>>;

export function Create<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps,
  ModalProps extends IModalProps = IModalProps
>({
  modal: modalProps,
  children,
  form,
}: PropsWithChildren<ICreateProps<Values, Data, FormButtonProps, ModalProps>>): ReactElement {
  const { useForm, useModalForm } = useUIContext();
  if (!modalProps) {
    return useForm<Values, Data, FormButtonProps>(form);
  }

  const useModalFormProps = {
    ...(modalProps === true ? {} : modalProps),
    title: form.title,
    form,
  } as IUseModalFormProps<Values, Data, FormButtonProps, IModalProps>;

  const { modal, openModal } = useModalForm<Values, Data, FormButtonProps, IModalProps>(
    useModalFormProps
  );

  return (
    <>
      <EnhanceChildren enhance={{ onClick: openModal }}>{children}</EnhanceChildren>
      {modal}
    </>
  );
}
