import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { IModalFormProps, IUseModalFormProps } from '../../modal/ModalForm';
import { IFormProps } from '../../form/Form';
import { EnhanceChildren, Form } from '@reactionable/core';
import { useUIContext } from '../../UI';

export interface IUpdateProps<Values, Data> extends IFormProps<Values, Data> {
    modal?: Omit<IModalFormProps<Values, Data>, 'form'> & IUseModalFormProps<Values, Data>;
};

export function Update<Values, Data>({ modal: modalProps, children, ...formProps }: PropsWithChildren<IUpdateProps<Values, Data>>) {
    if (!modalProps) {
        return <Form<Values, Data> {...formProps} />;
    }

    const { t } = useTranslation();
    const { useModalForm } = useUIContext();
    const { modal, openModal } = useModalForm({
        ...modalProps,
        submitButton: modalProps.submitButton || t('Save'),
        form: formProps,
    });

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};