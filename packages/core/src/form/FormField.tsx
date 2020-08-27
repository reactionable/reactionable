import React, { RefObject, ReactElement, HTMLProps, useRef, useEffect } from 'react';
import { Field, FieldProps, getIn, FieldInputProps, FastField } from 'formik';

export type IFormFieldValue = string;
export type IFieldElementProps<InputElement extends HTMLElement = HTMLInputElement> = HTMLProps<
  InputElement
>;

export type IFieldInputPropsEnhanced<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldElementProps &
  FieldInputProps<Value> & {
    isValid: boolean;
    isInvalid: boolean;
    ref: RefObject<any>;
  };

export type IFormFieldPropsEnhanced<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldProps<Value> & {
  error?: string;
  field: IFieldInputPropsEnhanced<FieldElementProps, Value>;
};

export type IRenderFormField<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = (fieldProps: IFormFieldPropsEnhanced<FieldElementProps, Value>) => ReactElement;

export type IFormFieldProps<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldElementProps & {
  children?: IRenderFormField<FieldElementProps, Value>;
  fastField?: boolean;
};

export function FormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({ children, autoFocus, fastField = true, ...props }: IFormFieldProps<FieldElementProps, Value>) {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (autoFocus === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, autoFocus]);

  const renderChildren = ({ field, ...fieldProps }: FieldProps<Value>) => {
    const touch = getIn(fieldProps.form.touched, field.name);
    const error = getIn(fieldProps.form.errors, field.name);
    const isValid = !!(touch && !error);
    const isInvalid = !!error;

    const fieldInputPropsEnhanced: IFieldInputPropsEnhanced<FieldElementProps, Value> = ({
      ...props,
      ...field,
      ...{
        isValid,
        isInvalid,
        ref: inputRef,
      },
    } as unknown) as IFieldInputPropsEnhanced<FieldElementProps, Value>;

    const fieldPropsEnhanced: IFormFieldPropsEnhanced<FieldElementProps, Value> = {
      ...fieldProps,
      error: touch ? error : undefined,
      field: fieldInputPropsEnhanced,
    };

    if (children) {
      return children(fieldPropsEnhanced);
    }

    const {
      isValid: isValidProp,
      isInvalid: isInvalidProp,
      ...inputProps
    } = fieldPropsEnhanced.field;

    return <input {...inputProps} />;
  };

  const FieldComponent = fastField ? FastField : Field;

  return <FieldComponent {...props} children={renderChildren} />;
}
