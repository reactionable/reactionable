import { FastField, Field, FieldInputProps, FieldProps, getIn } from "formik";
import React, {
  ComponentType,
  HTMLProps,
  ReactElement,
  ReactNode,
  RefObject,
  createElement,
  useEffect,
  useRef,
} from "react";

export type IFormFieldValue = string;
export type IFieldElementProps<
  FieldProps extends HTMLProps<HTMLInputElement> = HTMLProps<HTMLInputElement>
> = FieldProps & {
  label?: ReactNode | string;
};

export type IFieldInputPropsEnhanced<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldElementProps &
  FieldInputProps<Value> & {
    ref: RefObject<unknown>;
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

export type IRenderFormField<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = ComponentType<IFormFieldPropsEnhanced<FieldElementProps, Value>>;

export type IFormFieldProps<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = FieldElementProps & {
  render?: IRenderFormField<FieldElementProps, Value>;
  fastField?: boolean;
};

export function RenderFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({
  field: { as, label, ...props },
}: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
  const formField = createElement(as || "input", props);

  if (!label) {
    return formField;
  }

  return (
    <label>
      {label}
      {formField}
    </label>
  );
}

type IFormFieldChildrenProps<
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

  const fieldInputPropsEnhanced: IFieldInputPropsEnhanced<FieldElementProps, Value> = ({
    as,
    ref: inputRef,
    ...field,
  } as unknown) as IFieldInputPropsEnhanced<FieldElementProps, Value>;

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
      render={render}
      autoFocus={autoFocus}
      as={as}
      fieldProps={{
        ...fieldProps,
        field: {
          ...props,
          ...fieldProps.field,
        },
      }}
    />
  );

  return <FieldComponent name={props.name}>{renderChildren}</FieldComponent>;
}
