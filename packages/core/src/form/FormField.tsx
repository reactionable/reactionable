import { FastField, Field, FieldInputProps, FieldProps, getIn } from "formik";
import {
  ChangeEvent,
  ComponentType,
  HTMLProps,
  ReactElement,
  ReactNode,
  RefObject,
  createElement,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { FormErrorMessage } from "./FormErrorMessage";

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

type IFormFieldInputProps<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
> = IFormFieldPropsEnhanced<FieldElementProps, Value>["field"];

const FormFieldInput = forwardRef(function FormFieldInput(
  { as = "input", ...props }: IFormFieldInputProps,
  ref
) {
  return createElement(as || "input", { ...props, ref });
});

export function RenderFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({
  error,
  field: { label, ...props },
}: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
  let fieldContent: ReactElement = <FormFieldInput {...props} />;

  if (error) {
    fieldContent = (
      <>
        {fieldContent}
        <FormErrorMessage name={props.name} />
      </>
    );
  }

  if (props.type === "hidden") {
    return fieldContent;
  }

  if (label) {
    fieldContent = (
      <label>
        {label} {fieldContent}
      </label>
    );
  }

  return <div>{fieldContent}</div>;
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
