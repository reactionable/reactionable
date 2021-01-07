import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
  IRenderFormField,
  getFormFieldLabelContent,
} from "@reactionable/core/lib/form/FormField";
import { ReactElement, ReactNode } from "react";
import FormCheck, { FormCheckProps } from "react-bootstrap/FormCheck";
import FormControl, { FormControlProps } from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

import { FormErrorMessage } from "./FormErrorMessage";

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
  isValid,
  isInvalid,
  field: { label, ...field },
}: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
  let input: ReactElement;

  const fieldProps = {
    ...field,
    isValid,
    isInvalid,
  };

  const labelContent = getFormFieldLabelContent(label, field.required);

  if (field.type === "checkbox") {
    input = <FormCheck {...(fieldProps as FormCheckProps)} label={labelContent} />;
  } else {
    input = <FormControl {...(fieldProps as FormControlProps)} />;
    if (labelContent) {
      input = (
        <>
          <FormLabel>{labelContent}</FormLabel>
          {input}
        </>
      );
    }
  }

  const fieldContent = (
    <>
      {input}
      <FormErrorMessage name={fieldProps.name} />
    </>
  );

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
