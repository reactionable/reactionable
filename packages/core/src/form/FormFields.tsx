import { FormikConfig, FormikProps } from "formik";
import { ReactElement } from "react";

import { IFormValues } from "./Form";

export type IFormFieldsProps<Values extends IFormValues = IFormValues> = {
  children: FormikConfig<Values>["children"];
  formikProps: FormikProps<Values>;
};

export function FormFields<Values extends IFormValues = IFormValues>({
  children,
  formikProps,
}: IFormFieldsProps<Values>): ReactElement {
  return children ? ("function" === typeof children ? children(formikProps) : children) : undefined;
}
