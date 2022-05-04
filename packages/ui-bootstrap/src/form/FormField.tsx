import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
} from "@reactionable/core/lib/form/FormField";
import { IRenderFormField } from "@reactionable/core/lib/form/RenderFormField";
import { ReactElement, ReactNode } from "react";

import { RenderFormField } from "./RenderFormField";

export type IFieldElementProps = ICoreFieldElementProps;

export type IFormFieldProps<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = Omit<ICoreFormFieldProps<FieldElementProps, Value>, "children"> & {
  children?: IRenderFormField<FieldElementProps, Value> | ReactNode;
};

export type IFormFieldPropsEnhanced<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

export function FormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>(props: IFormFieldProps<FieldElementProps, Value>): ReactElement {
  const formFieldProps = {
    ...props,
    render: RenderFormField,
  } as ICoreFormFieldProps<FieldElementProps, Value>;

  return <CoreFormField {...formFieldProps} />;
}
