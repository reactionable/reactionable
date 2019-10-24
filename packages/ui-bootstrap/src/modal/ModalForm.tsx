import * as React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FormikProps, FormikActions } from 'formik';
import { IModalFormProps as ICoreModalFormProps, useModal } from '@reactionable/core';
import { IFormProps, Form } from '../form/Form';
import { Modal, IModalProps } from './Modal';

export type IModalFormProps<Values, Data> = Omit<ICoreModalFormProps<Values, Data>, 'form'> & IModalProps & {
    form: Omit<IFormProps<Values, Data>, 'title'>;
};

export type ModalFormComponent<Values = any, Data = any> = React.FC<IModalFormProps<Values, Data>>;


export const ModalForm: ModalFormComponent = ({ submitButton, form, ...modalProps }) => {
    const { t } = useTranslation();

    const render = form.render;
    form.render = (formikBag: FormikProps<any>, isLoading: boolean) => {
        const onCancel = () => {
            if (modalProps.onHide) {
                modalProps.onHide();
            }
        };
        return <>
            <BootstrapModal.Body>{render(formikBag, isLoading)}</BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button disabled={isLoading} type="submit" variant="primary">{submitButton}</Button>
                <Button disabled={isLoading} onClick={onCancel} variant="secondary">{t('Cancel')}</Button>
            </BootstrapModal.Footer>
        </>;
    };

    return <Modal {...modalProps}>
        <Form
            {...form}
            title={modalProps.title}
        />
    </Modal>;
};


export type IUseModalFormProps<Values, Data> = React.PropsWithChildren<IModalFormProps<any, any>>;

export const useModalForm = (props: IUseModalFormProps<any, any>) => {
    const onSubmit = props.form.onSubmit;
    props.form.onSubmit = async (values: any, actions: FormikActions<any>) => {
        const result = await onSubmit(values, actions);
        if (props.onHide) {
            props.onHide();
        }
        return result;
    };
    return useModal({
        Component: Modal,
        ...props,
    });
};
