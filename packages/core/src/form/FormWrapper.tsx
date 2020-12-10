import { Form } from "formik";
import { ComponentProps, ComponentType, ReactElement, ReactNode } from "react";

import { IFormValues } from "./Form";
import { IFormButtonProps, IUseSubmitFormButtonProps, useSubmitFormButton } from "./FormButton";
import { FormFields, IFormFieldsProps } from "./FormFields";

export type IFormElementProps = Omit<ComponentProps<typeof Form>, "onSubmit"> & {
  "data-testid"?: string;
};

export type IFormWrapperProps<
  Values extends IFormValues,
  FormButtonProps extends IFormButtonProps
> = {
  errorAlert: ReactNode;
  loader: ReactNode;
  successNotification: ReactNode;
  children: IFormFieldsProps<Values>["children"];
  formikProps: IFormFieldsProps<Values>["formikProps"];
  form?: IFormElementProps;
  submitButton?: FormButtonProps["children"];
  FormButtonComponent?: ComponentType<FormButtonProps>;
};

export function FormWrapper<Values extends IFormValues, FormButtonProps extends IFormButtonProps>({
  children,
  submitButton,
  form,
  formikProps,
  errorAlert,
  loader,
  successNotification,
  FormButtonComponent,
}: IFormWrapperProps<Values, FormButtonProps>): ReactElement {
  const formFields = <FormFields formikProps={formikProps}>{children}</FormFields>;

  let submit: ReactNode = undefined;
  if (submitButton) {
    const submitFormButtonProps = {
      children: submitButton,
      disabled: formikProps.isSubmitting,
      Component: FormButtonComponent,
    } as IUseSubmitFormButtonProps<FormButtonProps>;

    submit = useSubmitFormButton<FormButtonProps>(submitFormButtonProps);
  }

  return (
    <Form {...form}>
      {errorAlert}
      {loader}
      {successNotification}
      {formFields}
      {submit}
    </Form>
  );
}
