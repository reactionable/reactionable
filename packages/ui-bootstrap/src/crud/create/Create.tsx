import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { EnhanceChildren } from '@reactionable/core';
import { useModalForm, IModalFormProps } from '../../modal/ModalForm';

export type ICreateProps<Values, Data> = IModalFormProps<Values, Data>;

export type CreateComponent<Values = any, Data = any> = React.FC<ICreateProps<Values, Data>>;

export const Create: CreateComponent = ({ children, ...props }) => {
    const { t } = useTranslation();
    const { modal, openModal } = useModalForm({
        submitButton: t('Save'),
        ...props,
    });

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};