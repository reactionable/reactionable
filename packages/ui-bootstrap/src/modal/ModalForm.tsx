import React, { PropsWithChildren } from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import {
  IUseModalFormProps as ICoreUseModalFormProps,
  IModalFormProps as ICoreModalFormProps,
  useModalForm as useCoreModalForm,
  IModalFormComponentProps as ICoreModalFormComponentProps,
  IFormChildrenProps,
} from '@reactionable/core';
import { IFormProps, Form } from '../form/Form';
import { IModalProps, useModal } from './Modal';

export interface IModalFormProps<Values, Data>
  extends ICoreModalFormProps<
    IFormProps<Values, Data> & { title: string | undefined },
    IModalProps & {
      submitButton?: string;
      cancelButton?: string;
    }
  > {}

export type IModalFormComponentProps<Values, Data> = ICoreModalFormComponentProps<
  IFormProps<Values, Data>
> & {
  submitButton?: string;
  cancelButton?: string;
};

export function ModalForm<Values, Data>({
  submitButton,
  cancelButton,
  closeModal,
  children,
  ...formProps
}: PropsWithChildren<IModalFormComponentProps<Values, Data>>) {
  const { t } = useTranslation();

  const renderFormChildren = (formikProps: IFormChildrenProps<Values>) => {
    const onCancel = () => {
      closeModal();
    };
    return (
      <>
        <BootstrapModal.Body>{children(formikProps)}</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button disabled={formikProps.isSubmitting} onClick={onCancel} variant="secondary">
            {cancelButton ? cancelButton : t('Cancel')}
          </Button>
          <Button disabled={formikProps.isSubmitting} type="submit" variant="primary">
            {submitButton ? submitButton : t('Save')}
          </Button>
        </BootstrapModal.Footer>
      </>
    );
  };

  return <Form {...formProps} children={renderFormChildren} />;
}

export interface IUseModalFormProps<Values = any, Data = any>
  extends ICoreUseModalFormProps<IModalFormProps<Values, Data>> {}

export function useModalForm<Values = any, Data = any>(props: IUseModalFormProps<Values, Data>) {
  return useCoreModalForm<IUseModalFormProps<Values, Data>>({
    ...props,
    FormComponent: ModalForm,
    useModal: useModal,
  });
}
