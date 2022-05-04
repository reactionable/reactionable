import { FieldInputProps } from "formik";
import { createElement, forwardRef, RefObject } from "react";
import { IFieldElementProps, IFormFieldValue, IFormFieldPropsEnhanced } from "./FormField";

export type IFieldInputPropsEnhanced<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldElementProps &
  FieldInputProps<Value> & {
    ref: RefObject<unknown>;
  };

export type IFormFieldInputProps<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
> = IFormFieldPropsEnhanced<FieldElementProps, Value>["field"];

export const FormFieldInput = forwardRef(function FormFieldInput(
  { as = "input", ...props }: IFormFieldInputProps,
  ref
) {
  return createElement(as || "input", { ...props, ref });
});
