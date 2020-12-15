import { Formik, FormikConfig, FormikHelpers, FormikProps } from "formik";
import { ComponentType, ReactElement, ReactNode, useEffect, useState } from "react";
import { AnySchema, object as yupObject } from "yup";
import Lazy from "yup/lib/Lazy";
import Reference from "yup/lib/Reference";

import { useUIContext } from "../ui/UI";
import { IFormButtonProps } from "./FormButton";
import { FormWrapper, IFormWrapperProps } from "./FormWrapper";

export type IOnSubmitForm<Values extends IFormValues, Data extends IFormData> = (
  values: Values,
  formikHelpers: FormikHelpers<Values>
) => Promise<Data | null>;

export type IFormValue = string | boolean | File;
export type IComposedFormValues = IFormValue | Array<IFormValue> | { [key: string]: IFormValue };
export type INestedFormValues =
  | IComposedFormValues
  | Array<IComposedFormValues>
  | { [key: string]: IComposedFormValues };

// eslint-disable-next-line @typescript-eslint/ban-types
export type IFormValues = {};
// eslint-disable-next-line @typescript-eslint/ban-types
export type IFormData = {};

export type IValidationSchema<Values extends IFormValues> = Record<
  keyof Values,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnySchema | Reference | Lazy<any, any>
>;

export interface IFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
> extends FormikConfig<Values> {
  title?: ReactNode;
  validationSchema: IValidationSchema<Values>;
  successMessage?: ReactNode;
  onSubmit: IOnSubmitForm<Values, Data>;
  onSuccess?: (result: Data | null) => void;
  children: IFormWrapperProps<Values, FormButtonProps>["children"];
  form?: IFormWrapperProps<Values, FormButtonProps>["form"];
  submitButton?: IFormWrapperProps<Values, FormButtonProps>["submitButton"];
  FormButtonComponent?: IFormWrapperProps<Values, FormButtonProps>["FormButtonComponent"];
}

export type FormComponent<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
> = ComponentType<IFormProps<Values, Data, FormButtonProps>>;

export function Form<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
>({
  title,
  validationSchema,
  successMessage,
  onSuccess,
  form,
  submitButton,
  FormButtonComponent,
  children,
  onSubmit,
  ...formikConfig
}: IFormProps<Values, Data, FormButtonProps>): ReactElement {
  const { useLoader, useSuccessNotification, useErrorAlert } = useUIContext();
  const { loader, setLoading } = useLoader({});
  const { errorAlert, setErrorAlert } = useErrorAlert({});
  const { successNotification, setSuccessNotification } = useSuccessNotification({ title });
  const [success, setSuccess] = useState<Data | null>();
  const shapedvalidationSchema = yupObject().shape(validationSchema);

  useEffect(() => {
    if (success) {
      if (successMessage) {
        setSuccessNotification(successMessage);
      }
      setSuccess(undefined);
      if (onSuccess) {
        onSuccess(success);
      }
    }
  }, [success]);

  if (submitButton === undefined) {
    submitButton = true;
  }

  const renderFormChildren = (formikProps: FormikProps<Values>) => (
    <FormWrapper<Values, FormButtonProps>
      form={form}
      submitButton={submitButton}
      formikProps={formikProps}
      loader={loader}
      errorAlert={errorAlert}
      successNotification={successNotification}
      FormButtonComponent={FormButtonComponent}
    >
      {children}
    </FormWrapper>
  );

  const onSubmitCallback = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    setLoading(true);

    try {
      const data = await onSubmit(values, formikHelpers);
      setSuccess(data);
    } catch (error) {
      setErrorAlert(error);
    }

    setLoading(false);
    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik onSubmit={onSubmitCallback} validationSchema={shapedvalidationSchema} {...formikConfig}>
      {renderFormChildren}
    </Formik>
  );
}
