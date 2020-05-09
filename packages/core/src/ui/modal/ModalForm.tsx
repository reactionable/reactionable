import React, { PropsWithChildren, FC} from 'react';
import { IFormProps } from '../../form/Form';
import { IUseModalProps, IModalProps, IUseModalResult, ModalComponent, IUseModal } from './Modal';

type IFormPropsType<MFP extends IModalFormProps> = MFP extends IModalFormProps<infer F>
  ? F extends IFormProps<any, any>
    ? F
    : never
  : never;

type IModalPropsType<MFP extends IModalFormProps> = MFP extends IModalFormProps<infer M>
  ? M extends IModalProps
    ? M
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
  useModal,
  form: {
    onSubmit,
    onSuccess,
    ...form
  },
  FormComponent,
  ...modalProps
}: P & {
  FormComponent: ModalFormComponent<any>;
  useModal: IUseModal<IUseModalProps<IModalPropsType<IModalFormPropsType<P>>>>;
}): IUseModalResult {
  const formProps: IFormPropsType<IModalFormPropsType<P>> = {
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
  } as IFormPropsType<IModalFormPropsType<P>>;


  const formElement = (
    <FormComponent {...formProps} closeModal={() => useModalResult.closeModal()} />
  );
  modalProps.children = formElement;

  const useModalResult = useModal(
    (modalProps as unknown) as IUseModalProps<IModalPropsType<IModalFormPropsType<P>>> & {
      Component: ModalComponent<IUseModalProps<IModalPropsType<IModalFormPropsType<P>>>>;
    }
  );

  return useModalResult;
}
