import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { IModalFormProps } from '../../modal/ModalForm';
import { IFormProps, Form } from '../../form/Form';
import { EnhanceChildren, IUseModalFormProps } from '@reactionable/core';
import { useUIContext } from '../../UI';

export interface ICreateProps<Values, Data> {
    modal?: Omit<IModalFormProps<Values, Data>, 'form' | 'title'> & IUseModalFormProps<IModalFormProps<Values, Data>>;
    form: IFormProps<Values, Data>;
};

export function Create<Values, Data>({ modal: modalProps, children, form }: PropsWithChildren<ICreateProps<Values, Data>>) {
    if (!modalProps) {
        return <Form<Values, Data> {...form} />;
    }

    const { t } = useTranslation();
    const { useModalForm } = useUIContext();
    const { modal, openModal } = useModalForm({
        ...modalProps,
        title: form.title,
        submitButton: modalProps.submitButton || t('Save'),
        form,
    } as IUseModalFormProps<IModalFormProps<Values, Data>>);

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};