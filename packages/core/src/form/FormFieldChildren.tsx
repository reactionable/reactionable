import { FieldProps, getIn } from "formik";
import { ReactElement, useEffect, useRef } from "react";
import {
  IFieldElementProps,
  IFormFieldValue,
  IFormFieldPropsEnhanced,
  IFormFieldProps,
} from "./FormField";
import { IFieldInputPropsEnhanced } from "./FormFieldInput";

import { RenderFormField } from "./RenderFormField";

export type IFormFieldChildrenProps<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = Pick<IFormFieldProps<FieldElementProps, Value>, "render" | "as" | "autoFocus"> & {
  fieldProps: FieldProps<Value>;
};

export function FormFieldChildren<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
>({
  as,
  render,
  autoFocus,
  fieldProps: { field, ...fieldProps },
}: IFormFieldChildrenProps<FieldElementProps, Value>): ReactElement {
  const inputRef = useRef<{ focus: () => void }>(null);

  useEffect(() => {
    if (autoFocus === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, autoFocus]);

  const touch = getIn(fieldProps.form.touched, field.name);
  const error = getIn(fieldProps.form.errors, field.name);
  const isValid = !!(touch && !error);
  const isInvalid = !!error;

  const fieldInputPropsEnhanced: IFieldInputPropsEnhanced<FieldElementProps, Value> = {
    as,
    ref: inputRef,
    ...field,
  } as unknown as IFieldInputPropsEnhanced<FieldElementProps, Value>;

  const fieldPropsEnhanced: IFormFieldPropsEnhanced<FieldElementProps, Value> = {
    ...fieldProps,
    error: touch ? error : undefined,
    isValid,
    isInvalid,
    field: fieldInputPropsEnhanced,
  };

  const RenderFormFieldComponent = render ?? RenderFormField;

  return <RenderFormFieldComponent {...fieldPropsEnhanced} />;
}
