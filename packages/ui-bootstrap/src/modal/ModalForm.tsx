import React, { PropsWithChildren } from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { IUseModalFormProps as ICoreUseModalFormProps, IModalFormProps as ICoreModalFormProps, useModal } from '@reactionable/core';
import { IFormProps, Form } from '../form/Form';
import { Modal, IModalProps } from './Modal';

export interface IModalFormProps<Values, Data> extends ICoreModalFormProps<
    IFormProps<Values, Data> & { title: string | undefined },
    IModalProps & {
        submitButton?: string;
    }
    > { };

export function ModalForm<Values, Data>({ submitButton, form, ...modalProps }: PropsWithChildren<IModalFormProps<Values, Data>>) {
    const { t } = useTranslation();

    const formChildren = form.formChildren;
    const renderFormChildren = (isLoading: boolean) => {
        const onCancel = () => {
            if (modalProps.onHide) {
                modalProps.onHide();
            }
        };
        return <>
            <BootstrapModal.Body>{formChildren(isLoading)}</BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button disabled={isLoading} type="submit" variant="primary">{submitButton}</Button>
                <Button disabled={isLoading} onClick={onCancel} variant="secondary">{t('Cancel')}</Button>
            </BootstrapModal.Footer>
        </>;
    };

    return <Modal {...modalProps}>
        <Form
            {...form}
            formChildren={renderFormChildren}
            title={form.title ? form.title : modalProps.title}
        />
    </Modal>;
};

export interface IUseModalFormProps<Values = any, Data = any> extends ICoreUseModalFormProps<IModalFormProps<Values, Data>> { };

export function useModalForm<Values = any, Data = any>(props: IUseModalFormProps<Values, Data>) {
    const onSubmit = props.form.onSubmit;
    props.form.onSubmit = async (values, formikHelpers) => {
        const result = await onSubmit(values, formikHelpers);
        if (props.onHide) {
            props.onHide();
        }
        return result;
    };
    return useModal<IUseModalFormProps<Values, Data>>({
        Component: ModalForm,
        ...props,
    });
};

