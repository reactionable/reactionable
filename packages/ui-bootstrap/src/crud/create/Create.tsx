import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { IModalFormProps } from '../../modal/ModalForm';
import { IFormProps } from '../../form/Form';
import { EnhanceChildren, Form, IUseModalFormProps } from '@reactionable/core';
import { useUIContext } from '../../UI';

export type ICreateProps<Values, Data> = IFormProps<Values, Data> & {
    modal?: Omit<IModalFormProps<Values, Data>, 'form' | 'title'>;
};

export function Create<Values, Data>({ modal: modalProps, children, ...formProps }: PropsWithChildren<ICreateProps<Values, Data>>) {
    if (!modalProps) {
        return <Form<Values, Data> {...formProps} />;
    }

    const { t } = useTranslation();
    const { useModalForm } = useUIContext();
    const { modal, openModal } = useModalForm({
        ...modalProps,
        title: formProps.title,
        submitButton: modalProps.submitButton || t('Save'),
        form: formProps,
    } as IUseModalFormProps<IModalFormProps<Values, Data>>);

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};