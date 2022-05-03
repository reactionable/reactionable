import { TextFieldProps } from "@material-ui/core";
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

export type IFieldElementProps = ICoreFieldElementProps & {
  label?: ReactNode | string;
  multiline?: TextFieldProps["multiline"];
};

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
