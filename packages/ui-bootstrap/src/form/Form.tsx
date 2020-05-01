import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { Form as FormikForm } from 'formik';
import {
  Form as CoreForm,
  IFormProps as ICoreFormProps,
  IOnSubmitForm as ICoreOnSubmitForm,
  IFormChildrenProps,
} from '@reactionable/core';

export type IFormProps<Values, Data> = ICoreFormProps<Values, Data> & {
  submitButton?: true | string;
};

export type IOnSubmitForm<Values, Data> = ICoreOnSubmitForm<Values, Data>;

export function Form<Values, Data>({
  children,
  submitButton,
  ...props
}: PropsWithChildren<IFormProps<Values, Data>>) {
  const { t } = useTranslation();

  const renderChildren = (formikProps: IFormChildrenProps<Values>) => {
    return (
      <FormikForm className="needs-validation mb-1">
        {children(formikProps)}
        {submitButton && (
          <Button disabled={formikProps.isSubmitting} type="submit" variant="primary">
            {submitButton === true ? t('Save') : submitButton}
          </Button>
        )}
      </FormikForm>
    );
  };

  return <CoreForm<Values, Data> {...props} children={renderChildren} />;
}
