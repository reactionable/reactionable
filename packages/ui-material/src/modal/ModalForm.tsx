import Button from '@material-ui/core/Button/Button';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import { FormFieldsChildren, IFormChildrenProps } from '@reactionable/core/lib/form/Form';
import {
  IModalFormComponentProps as ICoreModalFormComponentProps,
  IModalFormProps as ICoreModalFormProps,
} from '@reactionable/core/lib/ui/modal/ModalForm';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Form, IFormProps } from '../form/Form';
import { renderSubmitButton } from '../form/SubmitButton';
import { IModalProps } from './Modal';

export interface IModalFormProps<Values = any, Data = any>
  extends ICoreModalFormProps<IFormProps<Values, Data>, IModalProps> {}

export type IModalFormComponentProps<Values, Data> = ICoreModalFormComponentProps<
  IFormProps<Values, Data>
> & {
  submitButton?: string;
  cancelButton?: string;
};

type IModalFormChildrenProps<Values, Data> = Pick<
  IModalFormComponentProps<Values, Data>,
  'submitButton' | 'cancelButton' | 'closeModal' | 'children'
> & { formikProps: IFormChildrenProps<Values> };

function ModalFormChildren<Values, Data>({
  submitButton,
  cancelButton,
  closeModal,
  children,
  formikProps,
}: IModalFormChildrenProps<Values, Data>) {
  const { t } = useTranslation();

  const submit = renderSubmitButton({
    submitButton,
    disabled: formikProps.isSubmitting,
  });

  return (
    <>
      <DialogContent>
        <FormFieldsChildren children={children} formikProps={formikProps} />
      </DialogContent>
      <DialogActions>
        <Button disabled={formikProps.isSubmitting} onClick={closeModal}>
          {cancelButton ? cancelButton : t('Cancel')}
        </Button>
        {submit}
      </DialogActions>
    </>
  );
}

export function ModalForm<Values, Data>({
  submitButton,
  cancelButton,
  closeModal,
  children,
  ...formProps
}: IModalFormComponentProps<Values, Data>) {
  return (
    <Form
      {...formProps}
      children={(formikProps) => (
        <ModalFormChildren
          submitButton={submitButton}
          cancelButton={cancelButton}
          closeModal={closeModal}
          children={children}
          formikProps={formikProps}
        />
      )}
    />
  );
}
