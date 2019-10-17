import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FormikProps, FormikActions } from 'formik';
import { IFormProps, Form } from '../form/Form';

interface IModalFormProps<Values, Data> extends IFormProps<Values, Data> {
    title: string;
    show?: boolean;
    submitButton: string;
    onHide?: () => void;
};

export type ModalFormComponent<Values = any, Data = any> = React.FC<IModalFormProps<Values, Data>>;

export const ModalForm: ModalFormComponent = ({ title, submitButton, show = true, render, onSubmit, ...props }) => {
    const { t } = useTranslation();

    const renderForm = (formikBag: FormikProps<any>, isLoading: boolean) => {
        const onCancel = () => {
            if (props.onHide) {
                props.onHide();
            }
        };
        return <>
            <Modal.Body>{render(formikBag, isLoading)}</Modal.Body>
            <Modal.Footer>
                <Button disabled={isLoading} type="submit" variant="primary">{submitButton}</Button>
                <Button disabled={isLoading} onClick={onCancel} variant="secondary">{t('Cancel')}</Button>
            </Modal.Footer>
        </>;
    };

    const modalFormOnSumbit = async (values: any, actions: FormikActions<any>) => {
        const result = await onSubmit(values, actions);
        if (props.onHide) {
            props.onHide();
        }
        return result;
    };

    return show ? <Modal centered show={true} onHide={props.onHide} backdrop="static" dialogClassName="modal-lg">
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form
            {...props}
            title={title}
            render={renderForm}
            onSubmit={modalFormOnSumbit}
        />
    </Modal> : <></>;
};

export const useModalForm = (props: IModalFormProps<any, any> | boolean) => {
    const [show, setShow] = useState('boolean' === typeof props ? props : props.show);

    return {
        show,
        modal: 'boolean' === typeof props
            ? undefined
            : <ModalForm {...props} show={show} />,
        openModalForm: () => { setShow(true); },
        closeModalForm: () => { setShow(false); },
    }
};
