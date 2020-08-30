import { IFormChildrenProps } from '@reactionable/core/lib/form/Form';
import {
  IModalFormComponentProps as ICoreModalFormComponentProps,
  IModalFormProps as ICoreModalFormProps,
  IUseModalFormProps as ICoreUseModalFormProps,
  useModalForm as useCoreModalForm,
} from '@reactionable/core/lib/ui/modal/ModalForm';
import React, { PropsWithChildren } from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapModal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

import { Form, IFormProps, SubmitButton } from '../form/Form';
import { IModalProps } from './Modal';

export interface IModalFormProps<Values, Data>
  extends ICoreModalFormProps<IFormProps<Values, Data>, IModalProps> {}

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
    return (
      <>
        <BootstrapModal.Body>{children(formikProps)}</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button disabled={formikProps.isSubmitting} onClick={closeModal} variant="secondary">
            {cancelButton ? cancelButton : t('Cancel')}
          </Button>
          <SubmitButton
            {...{
              disabled: formikProps.isSubmitting,
              children: typeof submitButton === 'string' ? submitButton : undefined,
            }}
          />
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
  });
}
