import React, { PropsWithChildren } from 'react';
import { IFormProps, Form } from '../../form/Form';
import { useModal, IUseModalProps, IModalProps, IUseModalResult, ModalComponent } from './Modal';

export type IModalFormProps<F extends IFormProps<any, any> = IFormProps<any, any>, M extends IModalProps = IModalProps> = M & {
    form: F;
};

type IModalPropsType<MFP extends IModalFormProps> = MFP extends IModalFormProps<infer M>
    ? (M extends IUseModalProps ? M : never)
    : never;

export type IUseModalFormProps<MFP extends IModalFormProps = IModalFormProps> = IUseModalProps<IModalPropsType<MFP>> & PropsWithChildren<MFP>;

export type IUseModalForm<P extends IUseModalFormProps> = (props: P) => IUseModalResult;

export function useModalForm<P extends IUseModalFormProps>({ form, ...modalProps }: P & {
    Component: ModalComponent;
}): IUseModalResult {
    const onSubmit = form.onSubmit;
    form.onSubmit = async (values, formikHelpers) => {
        const result = await onSubmit(values, formikHelpers);
        if (modalProps.onHide) {
            modalProps.onHide();
        }
        return result;
    };
    modalProps.children = <Form {...form} />;
    return useModal<IUseModalProps<IModalPropsType<P>>>(modalProps as unknown as IModalPropsType<P> & {
        Component: ModalComponent;
    });
};