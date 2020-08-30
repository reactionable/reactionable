import { Formik, FormikHelpers, FormikProps } from 'formik';
import React, { FC, PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'yup';

import { useUIContext } from '../ui/UI';

export type IOnSubmitForm<Values, Data> = (
  values: Values,
  formikHelpers: FormikHelpers<Values>
) => Promise<Data>;
export type IFormChildrenProps<Values> = FormikProps<Values>;
export interface IFormProps<Values, Data> {
  title: string;
  formSchema: object;
  onSubmit: IOnSubmitForm<Values, Data>;
  submitButton?: true | string;
  formValues: Values;
  children: (formikProps: IFormChildrenProps<Values>) => ReactElement;
  successMessage?: string;
  onSuccess?: (result: Data) => void;
}

export type FormComponent<P extends IFormProps<any, any> = IFormProps<any, any>> = FC<P>;

export function Form<Values, Data>(props: PropsWithChildren<IFormProps<Values, Data>>) {
  const { children, title, onSubmit, formValues, onSuccess, successMessage } = props;
  const formSchema = object().shape(props.formSchema);

  const { t } = useTranslation();
  const { useLoader, useSuccessNotification, useErrorAlert } = useUIContext();
  const { loader, setLoading } = useLoader({});
  const { errorAlert, setErrorAlert } = useErrorAlert({});
  const { successNotification, setSuccessNotification } = useSuccessNotification({ title });
  const [success, setSuccess] = useState<Data>();

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

  const renderFormChildren = (formikProps: FormikProps<Values>) => {
    const form = children(formikProps);
    return (
      <>
        {errorAlert}
        {loader}
        {successNotification}
        {form}
      </>
    );
  };

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
      initialValues={formValues}
      onSubmit={onSubmitCallback}
      validationSchema={formSchema}
      children={renderFormChildren}
    />
  );
}

export type IUseFormProps<
  P extends IFormProps<any, any> = IFormProps<any, any>
> = PropsWithChildren<P>;

export type IUseFormResult = ReactElement;

export type IUseForm<P extends IUseFormProps> = (props: P) => IUseFormResult;

export function useForm<P extends IUseFormProps>({
  Component,
  ...props
}: P & {
  Component: FormComponent<any>;
}): IUseFormResult {
  return <Component {...props} />;
}
