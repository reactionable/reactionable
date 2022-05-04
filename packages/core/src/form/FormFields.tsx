import { FormikConfig, FormikProps } from "formik";
import { isValidElement, ReactElement } from "react";

import { IFormValues } from "./Form";

export type IFormFieldsProps<Values extends IFormValues = IFormValues> = {
  children: FormikConfig<Values>["children"];
  formikProps: FormikProps<Values>;
};

export function FormFields<Values extends IFormValues = IFormValues>({
  children,
  formikProps,
}: IFormFieldsProps<Values>): ReactElement | null {
  if ("function" === typeof children) {
    children = children(formikProps);
  }
  if (!children) {
    return null;
  }

  if (isValidElement(children)) {
    return children;
  }

  return <>{children}</>;
}
