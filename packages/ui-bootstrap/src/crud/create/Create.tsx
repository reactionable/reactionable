import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { EnhanceChildren } from '@reactionable/core';
import { useModalForm, IModalFormProps } from '../../modal/ModalForm';

export type ICreateProps<Values, Data> = IModalFormProps<Values, Data> & {
    submitButton?: string;
};

export function Create<Values, Data>({ children,submitButton, ...props }: React.PropsWithChildren<ICreateProps<Values, Data>>){
    const { t } = useTranslation();
    const { modal, openModal } = useModalForm<Values, Data>({
        submitButton: submitButton || t('Save'),
        ...props,
    });

    return <>
        <EnhanceChildren children={children} enhance={{ onClick: openModal }} />
        {modal}
    </>;
};