import { Formik, FormikConfig, Form as FormikForm, FormikHelpers, FormikProps } from 'formik';
import React, {
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import { useUIContext } from '../ui/UI';
import { ISubmitButtonProps, SubmitButton, renderSubmitButton } from './SubmitButton';

export type IOnSubmitForm<Values, Data> = (
  values: Values,
  formikHelpers: FormikHelpers<Values>
) => Promise<Data>;

export type IFormComponentProps = ComponentProps<typeof FormikForm> & { 'data-testid'?: string };

export interface IFormProps<
  Values,
  Data,
  FormComponentProps extends IFormComponentProps = IFormComponentProps
> extends FormikConfig<Values> {
  title: string;
  validationSchema: object;
  onSubmit: IOnSubmitForm<Values, Data>;
  submitButton?: true | string | ReactNode;
  submitButtonComponent?: ComponentType<ISubmitButtonProps<any>>;
  successMessage?: string;
  onSuccess?: (result: Data) => void;
  form?: FormComponentProps;
}

export type IFormChildrenProps<Values> = FormikProps<Values>;

type IRenderFormChildrenProps<Values, Data> = Pick<
  IFormProps<Values, Data>,
  'children' | 'submitButton' | 'form' | 'submitButtonComponent'
> & {
  formikProps: IFormChildrenProps<Values>;
  errorAlert: ReactNode;
  loader: ReactNode;
  successNotification: ReactNode;
};

export function FormFieldsChildren<Values, Data>({
  children,
  formikProps,
}: {
  children: IFormProps<Values, Data>['children'];
  formikProps: IFormChildrenProps<Values>;
}) {
  return children ? ('function' === typeof children ? children(formikProps) : children) : undefined;
}

export function FormChildren<Values, Data>({
  children,
  submitButton,
  form,
  formikProps,
  errorAlert,
  loader,
  successNotification,
  submitButtonComponent,
}: IRenderFormChildrenProps<Values, Data>) {
  const formFields = <FormFieldsChildren children={children} formikProps={formikProps} />;

  const submit = submitButton
    ? renderSubmitButton({
        submitButton,
        Component: submitButtonComponent || SubmitButton,
        disabled: formikProps.isSubmitting,
      })
    : undefined;

  return (
    <FormikForm {...form}>
      {errorAlert}
      {loader}
      {successNotification}
      {formFields}
      {submit}
    </FormikForm>
  );
}

export type FormComponent<P extends IFormProps<any, any> = IFormProps<any, any>> = ComponentType<P>;
export function Form<Values, Data>({
  title,
  onSubmit,
  onSuccess,
  successMessage,
  validationSchema,
  form,
  submitButton,
  submitButtonComponent,
  children,
  ...formikConfig
}: IFormProps<Values, Data>) {
  const { t } = useTranslation();
  const { useLoader, useSuccessNotification, useErrorAlert } = useUIContext();
  const { loader, setLoading } = useLoader({});
  const { errorAlert, setErrorAlert } = useErrorAlert({});
  const { successNotification, setSuccessNotification } = useSuccessNotification({ title });
  const [success, setSuccess] = useState<Data>();
  validationSchema = object().shape(validationSchema);

  useEffect(() => {
    if (success) {
      if (successMessage) {
        setSuccessNotification(t(successMessage, success));
      }
      if (onSuccess) {
        setSuccess(undefined);
        onSuccess(success);
      }
    }
  }, [success, onSuccess]);

  const renderFormChildren = (formikProps: FormikProps<Values>) => (
    <FormChildren<Values, Data>
      children={children}
      form={form}
      submitButton={submitButton}
      formikProps={formikProps}
      loader={loader}
      errorAlert={errorAlert}
      successNotification={successNotification}
      submitButtonComponent={submitButtonComponent}
    />
  );

  const onSubmitCallback = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    setLoading(true);

    try {
      const data = await onSubmit(values, formikHelpers);
      if (onSuccess) {
        setSuccess(data);
      }
    } catch (error) {
      setErrorAlert(error);
    }

    setLoading(false);
    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik
      onSubmit={onSubmitCallback}
      validationSchema={validationSchema}
      children={renderFormChildren}
      {...formikConfig}
    />
  );
}

export type IUseFormProps<
  P extends IFormProps<any, any> = IFormProps<any, any>
> = PropsWithChildren<P>;

export type IUseFormResult = ReactNode;

export type IUseForm<P extends IUseFormProps> = (props: P) => IUseFormResult;

export function useForm<P extends IUseFormProps>({
  Component,
  ...props
}: P & {
  Component: FormComponent<any>;
}): IUseFormResult {
  return <Component {...props} />;
}
