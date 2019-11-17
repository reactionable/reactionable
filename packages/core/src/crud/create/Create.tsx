import React, { FC, PropsWithChildren } from 'react';
import { IFormProps, Form } from '../../form/Form';
import { IModalFormProps, IUseModalFormProps } from '../../ui/modal/ModalForm';
import { EnhanceChildren } from '../../enhance-children/EnhanceChildren';
import { useUIContext } from '../../ui/UI';

export interface ICreateProps<Values, Data> extends IFormProps<Values, Data> {
    modal?: Omit<IModalFormProps<IFormProps<Values, Data>>, 'form' | 'title'> & IUseModalFormProps<IModalFormProps<IFormProps<Values, Data>>>;
};

export type CreateComponent<Values, Data> = FC<ICreateProps<Values, Data>>;
export function Create<Values, Data>({ modal: modalProps, children, ...formProps }: PropsWithChildren<ICreateProps<Values, Data>>) {
    if (!modalProps) {
        return <Form<Values, Data> {...formProps} children={children} />;
    }

    const { useModalForm } = useUIContext();
    const { modal, openModal } = useModalForm({
        ...modalProps,
        title: formProps.title,
        form: formProps,
        children,
    });

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};