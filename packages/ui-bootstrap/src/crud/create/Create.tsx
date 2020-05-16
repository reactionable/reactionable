import React, { PropsWithChildren } from 'react';
import { IModalFormProps } from '../../modal/ModalForm';
import { IFormProps, Form } from '../../form/Form';
import { EnhanceChildren, IUseModalFormProps } from '@reactionable/core';
import { useUIContext } from '../../UI';

export interface ICreateProps<Values, Data> {
  modal?: Omit<IUseModalFormProps<IModalFormProps<Values, Data>>, 'form' | 'title'> | true;
  form: IFormProps<Values, Data>;
}

export function Create<Values, Data>({
  modal: modalProps,
  children,
  form,
}: PropsWithChildren<ICreateProps<Values, Data>>) {
  if (!modalProps) {
    return <Form<Values, Data> {...form} />;
  }

  const { useModalForm } = useUIContext();
  const { modal, openModal } = useModalForm({
    ...(modalProps === true ? {} : modalProps),
    title: form.title,
    form,
  } as IUseModalFormProps<IModalFormProps<Values, Data>>);

  return (
    <>
      <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
      {modal}
    </>
  );
}
