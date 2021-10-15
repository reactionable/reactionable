import { CheckboxProps, SelectProps, TextareaAutosizeProps, TextFieldProps } from "@mui/material";
import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue as ICoreFormFieldValue,
  IRenderFormField,
} from "@reactionable/core";
import { ReactElement, ReactNode } from "react";

import { RenderFormField } from "./RenderFormField";

type MaterialFieldProps = TextFieldProps | CheckboxProps | SelectProps | TextareaAutosizeProps;

export type IFieldElementProps = ICoreFieldElementProps & MaterialFieldProps;

export type IFormFieldValue = ICoreFormFieldValue;

export type IFormFieldProps<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue,
> = Omit<ICoreFormFieldProps<FieldElement, Value>, "children"> & {
  children?: IRenderFormField<IFieldElementProps, Value> | ReactNode;
};

export type IFormFieldPropsEnhanced<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue,
> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

export function FormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue,
>(props: IFormFieldProps<FieldElementProps, Value>): ReactElement {
  const formFieldProps = {
    ...props,
    render: RenderFormField,
  } as ICoreFormFieldProps<FieldElementProps, Value>;

  return <CoreFormField {...formFieldProps} />;
}
