import { FastField, Field, FieldProps } from "formik";
import { ChangeEvent, HTMLProps, ReactElement, ReactNode } from "react";

import { FormFieldChildren, IFormFieldChildrenProps } from "./FormFieldChildren";
import { IFieldInputPropsEnhanced } from "./FormFieldInput";
import { IRenderFormField } from "./RenderFormField";

export type IFormFieldValue = string;
export type IFieldElementProps<
  FieldProps extends HTMLProps<HTMLInputElement> = HTMLProps<HTMLInputElement>
> = FieldProps & {
  label?: ReactNode | string;
};

export type IFormFieldPropsEnhanced<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldProps<Value> & {
  error?: string;
  isValid: boolean;
  isInvalid: boolean;
  field: IFieldInputPropsEnhanced<FieldElementProps, Value>;
};

export type IFormFieldProps<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldElementProps & {
  render?: IRenderFormField<FieldElementProps, Value>;
  fastField?: boolean;
};

export function FormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({
  render,
  fastField = true,
  autoFocus,
  as,
  ...props
}: IFormFieldProps<FieldElementProps, Value>): ReactElement {
  const FieldComponent = fastField ? FastField : Field;

  const renderChildren = (fieldProps: FieldProps<Value>) => (
    <FormFieldChildren<FieldElementProps, Value>
      render={render as IFormFieldChildrenProps<FieldElementProps, Value>["render"]}
      autoFocus={autoFocus}
      as={as}
      fieldProps={{
        ...fieldProps,
        field: {
          ...props,
          ...fieldProps.field,
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            props.onChange && props.onChange(event);
            fieldProps.field.onChange && fieldProps.field.onChange(event);
          },
        },
      }}
    />
  );

  return <FieldComponent name={props.name}>{renderChildren}</FieldComponent>;
}
