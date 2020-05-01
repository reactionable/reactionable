import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { FormikHelpers, Formik, FormikProps } from 'formik';
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
  formValues: Values;
  children: (formikProps: IFormChildrenProps<Values>) => ReactElement;
  successMessage?: string;
  onSuccess?: (result: Data) => void;
}

export type FormComponent<P extends IFormProps<any, any> = IFormProps<any, any>> = FC<P>;

export function Form<Values, Data>(props: PropsWithChildren<IFormProps<Values, Data>>) {
  const { t } = useTranslation();
  const formSchema = object().shape(props.formSchema);
  const { children, title, onSubmit, formValues, onSuccess, successMessage } = props;

  const { useLoader, useSuccessNotification, useErrorAlert } = useUIContext();
  const { loader, setLoading } = useLoader({});
  const { errorAlert, setErrorAlert } = useErrorAlert({});
  const { successNotification, setSuccessNotification } = useSuccessNotification({ title });

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

  const onSubmitCallback = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    setLoading(true);
    onSubmit(values, formikHelpers)
      .then((data: Data) => {
        if (successMessage) {
          setSuccessNotification(t(successMessage, data));
        }
        if (onSuccess) {
          onSuccess(data);
        }
      })
      .catch((error) => {
        setErrorAlert(error);
      })
      .finally(() => {
        setLoading(false);
        formikHelpers.setSubmitting(false);
      });
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
