import React, { PropsWithChildren, useEffect, useState, FC } from 'react';
import { IFormProps } from '../../form/Form';
import { IUseModalProps, IModalProps, IUseModalResult, ModalComponent, IUseModal } from './Modal';

type IFormPropsType<MFP extends IModalFormProps> = MFP extends IModalFormProps<infer F>
    ? (F extends IFormProps<any, any> ? F : never)
    : never;

type IModalPropsType<MFP extends IModalFormProps> = MFP extends IModalFormProps<infer M>
    ? (M extends IModalProps ? M : never)
    : never;

type IModalFormPropsType<UMFP extends IUseModalFormProps> = UMFP extends IUseModalFormProps<infer MFP>
    ? (MFP extends IModalFormProps ? MFP : never)
    : never;

export type IModalFormProps<
    F extends IFormProps<any, any> = IFormProps<any, any>,
    M extends IModalProps = IModalProps
    > = PropsWithChildren<M> & {
        form: PropsWithChildren<F>;
    };

export type IUseModalFormProps<MFP extends IModalFormProps = IModalFormProps> = IUseModalProps<MFP>;

export type IUseModalForm<P extends IUseModalFormProps> = (props: P) => IUseModalResult;
   
export type IModalFormComponentProps<P extends IFormProps<any, any>> = P & Pick<IUseModalResult,'closeModal'>;

export type ModalFormComponent<P extends IFormProps<any, any>> = FC<IModalFormComponentProps<P>>;

export function useModalForm<P extends IUseModalFormProps>({ useModal, form, FormComponent, ...modalProps }: P & {
    FormComponent: ModalFormComponent<any>;
    useModal: IUseModal<IUseModalProps<IModalPropsType<IModalFormPropsType<P>>>>;
}): IUseModalResult {

    const [hide, setHide] = useState<boolean>(false);

    const onSubmit = form.onSubmit;
    const formProps: IFormPropsType<IModalFormPropsType<P>> = {
        ...form,
        onSubmit: async (values, formikHelpers) => {
            const result = await onSubmit(values, formikHelpers);
            setHide(true);
            return result;
        }
    } as IFormPropsType<IModalFormPropsType<P>>;

    const formElement = <FormComponent {...formProps} closeModal={() => setHide(true)} />;
    modalProps.children = formElement;

    const useModalResult = useModal(modalProps as unknown as IUseModalProps<
        IModalPropsType<
            IModalFormPropsType<P>
        >
    > & {
        Component: ModalComponent<IUseModalProps<
            IModalPropsType<
                IModalFormPropsType<P>
            >
        >>;
    });

    useEffect(() => {
        if (hide) {
            useModalResult.closeModal();
        }
    }, [hide]);

    return useModalResult;
};