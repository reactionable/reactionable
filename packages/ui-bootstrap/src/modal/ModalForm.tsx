import * as React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FormikProps, FormikHelpers } from 'formik';
import { IModalFormProps as ICoreModalFormProps } from '@reactionable/core';
import { IFormProps, Form } from '../form/Form';
import { Modal, IModalProps, useModal } from './Modal';

export type IModalFormProps<Values, Data> = IModalProps
    & Pick<ICoreModalFormProps<Values, Data>, 'submitButton'>
    & {
        form: Omit<IFormProps<Values, Data>, 'title'>;
    };

export function ModalForm<Values, Data>({ submitButton, form, ...modalProps }: React.PropsWithChildren<IModalFormProps<Values, Data>>) {
    const { t } = useTranslation();

    const render = form.render;
    const formRender = (formikProps: FormikProps<Values>, isLoading: boolean) => {
        const onCancel = () => {
            if (modalProps.onHide) {
                modalProps.onHide();
            }
        };
        return <>
            <BootstrapModal.Body>{render(formikProps, isLoading)}</BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button disabled={isLoading} type="submit" variant="primary">{submitButton}</Button>
                <Button disabled={isLoading} onClick={onCancel} variant="secondary">{t('Cancel')}</Button>
            </BootstrapModal.Footer>
        </>;
    };

    return <Modal {...modalProps}>
        <Form
            {...form}
            render={formRender}
            title={modalProps.title}
        />
    </Modal>;
};

export type IUseModalFormProps<Values, Data> = React.PropsWithChildren<IModalFormProps<Values, Data>>;

export function useModalForm<Values, Data>(props: IUseModalFormProps<Values, Data>) {
    const onSubmit = props.form.onSubmit;
    props.form.onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
        const result = await onSubmit(values, formikHelpers);
        if (props.onHide) {
            props.onHide();
        }
        return result;
    };
    return useModal({
        Component: ModalForm,
        ...props,
    });
};

