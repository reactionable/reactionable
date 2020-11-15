import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
  IRenderFormField,
} from "@reactionable/core/lib/form/FormField";
import React, { ReactElement, ReactNode } from "react";
import Feedback from "react-bootstrap/Feedback";
import FormCheck, { FormCheckProps } from "react-bootstrap/FormCheck";
import FormControl, { FormControlProps } from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

export type IFieldElementProps = ICoreFieldElementProps;

export type IFormFieldProps<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = Omit<ICoreFormFieldProps<FieldElement, Value>, "children"> & {
  children?: IRenderFormField<IFieldElementProps, Value> | ReactNode;
};

export type IFormFieldPropsEnhanced<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

export function RenderFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({
  error,
  isValid,
  isInvalid,
  field,
}: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
  let fieldContent: ReactElement;

  const fieldProps = {
    ...field,
    isValid,
    isInvalid,
  };

  if (field.type === "checkbox") {
    fieldContent = <FormCheck {...(fieldProps as FormCheckProps)} />;
  } else {
    fieldContent = <FormControl {...(fieldProps as FormControlProps)} />;
    if (field.label) {
      fieldContent = (
        <>
          <FormLabel>{field.label}</FormLabel>
          {fieldContent}
        </>
      );
    }
  }

  if (error) {
    fieldContent = (
      <>
        {fieldContent}
        <Feedback type="invalid">{error}</Feedback>
      </>
    );
  }

  if (field.type === "hidden") {
    return fieldContent;
  }

  return <FormGroup controlId={field.name}>{fieldContent}</FormGroup>;
}

export function FormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>(props: IFormFieldProps<FieldElementProps, Value>): ReactElement {
  return <CoreFormField<ICoreFieldElementProps, Value> {...props} render={RenderFormField} />;
}
