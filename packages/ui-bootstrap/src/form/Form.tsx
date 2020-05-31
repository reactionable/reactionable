import React, { PropsWithChildren, Children } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import { Form as FormikForm } from 'formik';
import {
  useForm as useCoreForm,
  Form as CoreForm,
  IFormProps as ICoreFormProps,
  IOnSubmitForm as ICoreOnSubmitForm,
  IFormChildrenProps,
} from '@reactionable/core';

export type IFormProps<Values, Data> = ICoreFormProps<Values, Data>;

export type IOnSubmitForm<Values, Data> = ICoreOnSubmitForm<Values, Data>;

export type ISubmitButtonProps = ButtonProps;

export function SubmitButton({ children, ...props }: PropsWithChildren<ISubmitButtonProps>) {
  const { t } = useTranslation();
  return (
    <Button
      type="submit"
      variant="primary"
      children={Children.count(children) ? children : t('Save')}
      {...props}
    />
  );
}

export function Form<Values, Data>({
  children,
  submitButton,
  ...props
}: PropsWithChildren<IFormProps<Values, Data>>) {
  const renderChildren = (formikProps: IFormChildrenProps<Values>) => {
    return (
      <FormikForm className="needs-validation mb-1">
        {children(formikProps)}
        {submitButton && (
          <SubmitButton
            {...{
              disabled: formikProps.isSubmitting,
              children: typeof submitButton === 'string' ? submitButton : undefined,
            }}
          />
        )}
      </FormikForm>
    );
  };

  return <CoreForm<Values, Data> {...props} children={renderChildren} />;
}

export type IUseFormProps<Values = any, Data = any> = PropsWithChildren<IFormProps<Values, Data>>;

export function useForm<Values, Data>(props: IUseFormProps<Values, Data>) {
  return useCoreForm<IUseFormProps<Values, Data>>({
    Component: Form,
    ...props,
  });
}
