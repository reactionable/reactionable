import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
  IRenderFormField,
} from '@reactionable/core/lib/form/FormField';
import React, { ReactNode } from 'react';
import Feedback from 'react-bootstrap/Feedback';
import FormCheck, { FormCheckProps } from 'react-bootstrap/FormCheck';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';

export type IFieldElementProps = ICoreFieldElementProps & {
  label?: ReactNode | string;
};

export type IFormFieldProps<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = Omit<ICoreFormFieldProps<FieldElement, Value>, 'children'> & {
  children?: IRenderFormField<IFieldElementProps, Value> | ReactNode;
};

export type IFormFieldPropsEnhanced<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

export function RenderFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({ error, isValid, isInvalid, field }: IFormFieldPropsEnhanced<FieldElementProps, Value>) {
  let fieldContent: ReactNode;

  const fieldProps = {
    ...field,
    isValid,
    isInvalid,
  };

  if (field.type === 'checkbox') {
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

  if (field.type === 'hidden') {
    return fieldContent;
  }

  return <FormGroup controlId={field.name}>{fieldContent}</FormGroup>;
}

export function FormField<
  FieldElement extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = string
>(props: IFormFieldProps<FieldElement, Value>) {
  return <CoreFormField<any, Value> {...props} render={RenderFormField} />;
}
