import { ComponentType, ReactElement } from "react";

import { FormField, IFieldElementProps, IFormFieldProps, IFormFieldValue } from "./FormField";

export type IUseFormFieldProps<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
> = IFormFieldProps<FieldElementProps, Value> & {
  Component?: ComponentType<IFormFieldProps<FieldElementProps, Value>>;
};

export type IUseFormFieldResult = ReactElement;

export function useFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({ Component, ...props }: IUseFormFieldProps<FieldElementProps, Value>): IUseFormFieldResult {
  if (!Component) {
    Component = FormField;
  }

  return <Component {...(props as IFormFieldProps<FieldElementProps, Value>)} />;
}
