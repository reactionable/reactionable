import React, { FC, PropsWithChildren } from 'react';
import { IFormProps, Form } from '../../form/Form';
import { IModalFormProps, IUseModalFormProps } from '../../ui/modal/ModalForm';
import { EnhanceChildren } from '../../enhance-children/EnhanceChildren';
import { useUIContext } from '../../ui/UI';

export interface IUpdateProps<Values, Data> extends IFormProps<Values, Data> {
    modal?: Omit<IModalFormProps<IFormProps<Values, Data>>, 'form'> & IUseModalFormProps<IModalFormProps<IFormProps<Values, Data>>>;
};

export type UpdateComponent<Values, Data> = FC<IUpdateProps<Values, Data>>;
export function Update<Values, Data>({ modal: modalProps, children, ...formProps }: PropsWithChildren<IUpdateProps<Values, Data>>) {
    if (!modalProps) {
        return <Form<Values, Data> {...formProps} />;
    }

    const { useModalForm } = useUIContext();
    const { modal, openModal } = useModalForm({
        ...modalProps,
        form: formProps,
    });

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};