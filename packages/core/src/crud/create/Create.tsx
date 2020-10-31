import React, { ComponentType, PropsWithChildren } from 'react';

import { EnhanceChildren } from '../../enhance-children/EnhanceChildren';
import { IFormProps } from '../../form/Form';
import { IModalFormProps } from '../../ui/modal/ModalForm';
import { IUseModalFormProps } from '../../ui/modal/useModalForm';
import { useUIContext } from '../../ui/UI';

export interface ICreateProps<Values, Data> {
  modal?:
    | Omit<IUseModalFormProps<IModalFormProps<IFormProps<Values, Data>>>, 'form' | 'title'>
    | true;
  form: IFormProps<Values, Data>;
}

export type CreateComponent<Values, Data> = ComponentType<ICreateProps<Values, Data>>;

export function Create<Values, Data>({
  modal: modalProps,
  children,
  form,
}: PropsWithChildren<ICreateProps<Values, Data>>) {
  const { useForm, useModalForm } = useUIContext();
  if (!modalProps) {
    return <>{useForm(form)}</>;
  }

  const { modal, openModal } = useModalForm({
    ...(modalProps === true ? {} : modalProps),
    title: form.title,
    form,
  });

  return (
    <>
      <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
      {modal}
    </>
  );
}
