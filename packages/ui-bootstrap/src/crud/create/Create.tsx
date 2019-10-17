import React from 'react';
import { useTranslation } from 'react-i18next';
import { EnhanceChildren } from '@reactionable/core';
import { ModalForm, useModalForm } from '../../modal-form/ModalForm';
import { IFormProps } from '../../form/Form';

export type ICreateProps<Values, Data> = IFormProps<Values, Data>;

export type CreateComponent<Values = any, Data = any> = React.FC<ICreateProps<Values, Data>>;

export const Create: CreateComponent = ({onSuccess,...props}) => {
    const { t } = useTranslation();
    const { show, openModalForm, closeModalForm } = useModalForm(false);
    const onFormSuccess = async (result: any) => {
        closeModalForm();
        if (onSuccess) {
            onSuccess(result);
        }
    };

    return <>
        <EnhanceChildren children={props.children} enhance={{ onClick: openModalForm }} />
        <ModalForm
            show={show}
            onSuccess={onFormSuccess}
            onHide={closeModalForm}
            submitButton={t('Save')}
            {...props}
        />
    </>;
};