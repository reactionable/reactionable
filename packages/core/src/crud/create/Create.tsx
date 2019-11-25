import React, { FC, PropsWithChildren } from 'react';
import { IFormProps, Form } from '../../form/Form';
import { IModalFormProps, IUseModalFormProps } from '../../ui/modal/ModalForm';
import { EnhanceChildren } from '../../enhance-children/EnhanceChildren';
import { useUIContext } from '../../ui/UI';

export interface ICreateProps<Values, Data> {
    modal?: Omit<IUseModalFormProps<IModalFormProps<IFormProps<Values, Data>>>, 'form' | 'title'>;
    form: IFormProps<Values, Data>;
};

export type CreateComponent<Values, Data> = FC<ICreateProps<Values, Data>>;

export function Create<Values, Data>({ modal: modalProps, children, form }: PropsWithChildren<ICreateProps<Values, Data>>) {
    if (!modalProps) {
        return <Form<Values, Data> {...form} />;
    }

    const { useModalForm } = useUIContext();
    const { modal, openModal } = useModalForm({
        ...modalProps,
        title: form.title,
        form,
    });

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};