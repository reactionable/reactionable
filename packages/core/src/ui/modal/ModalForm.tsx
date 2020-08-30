import React, { FC, PropsWithChildren } from 'react';

import { IFormProps } from '../../form/Form';
import { useUIContext } from '../UI';
import { IModalProps, IUseModalProps, IUseModalResult } from './Modal';

type IFormPropsType<MFP extends IModalFormProps> = MFP extends IModalFormProps<infer F>
  ? F extends IFormProps<any, any>
    ? F
    : never
  : never;

type IModalFormPropsType<UMFP extends IUseModalFormProps> = UMFP extends IUseModalFormProps<
  infer MFP
>
  ? MFP extends IModalFormProps
    ? MFP
    : never
  : never;

export type IModalFormProps<
  F extends IFormProps<any, any> = IFormProps<any, any>,
  M extends IModalProps = IModalProps
> = PropsWithChildren<M> & {
  form: PropsWithChildren<Omit<F, 'title'>>;
};

export type IUseModalFormProps<MFP extends IModalFormProps = IModalFormProps> = IUseModalProps<MFP>;

export type IUseModalForm<P extends IUseModalFormProps> = (props: P) => IUseModalResult;

export type IModalFormComponentProps<P extends IFormProps<any, any>> = P &
  Pick<IUseModalResult, 'closeModal'>;

export type ModalFormComponent<P extends IFormProps<any, any>> = FC<IModalFormComponentProps<P>>;

export function useModalForm<P extends IUseModalFormProps>({
  form: { onSubmit, onSuccess, ...form },
  FormComponent,
  ...modalProps
}: P & {
  FormComponent?: ModalFormComponent<any>;
}): IUseModalResult {
  const { useForm, useModal } = useUIContext();

  const formProps = {
    ...form,
    onSubmit: async (values, formikHelpers) => {
      const result = await onSubmit(values, formikHelpers);
      return result;
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
      useModalResult.closeModal();
    },
    closeModal: () => useModalResult.closeModal(),
  } as IModalFormComponentProps<IFormPropsType<IModalFormPropsType<P>>>;

  const formElement = FormComponent ? <FormComponent {...formProps} /> : useForm(formProps);

  modalProps.children = formElement;

  const useModalResult = useModal(modalProps);

  return useModalResult;
}
