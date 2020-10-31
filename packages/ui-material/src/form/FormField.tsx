import React from 'react';
import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue as ICoreFormFieldValue,
  IRenderFormField as ICoreRenderFormField,
} from '@reactionable/core/lib/form/FormField';

export type IFormFieldValue = ICoreFormFieldValue;
export type IFieldElementProps<
  InputElement extends HTMLElement = HTMLInputElement
> = ICoreFieldElementProps<InputElement>;

export type IFieldInputPropsEnhanced<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldPropsEnhanced<FieldElementProps, Value>;

export type IFormFieldPropsEnhanced<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldPropsEnhanced<FieldElementProps, Value>;

export type IRenderFormField<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreRenderFormField<FieldElementProps, Value>;

export type IFormFieldProps<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldProps<FieldElementProps, Value>;

export function FormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>(props: IFormFieldProps<FieldElementProps, Value>) {
  return <CoreFormField {...props} />;
}
