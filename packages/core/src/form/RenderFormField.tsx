import { ComponentType, ReactElement, ReactNode } from "react";
import { FormErrorMessage } from "./FormErrorMessage";
import { IFieldElementProps, IFormFieldValue, IFormFieldPropsEnhanced } from "./FormField";
import { FormFieldInput } from "./FormFieldInput";

export function getFormFieldLabelContent(
  label?: ReactNode,
  required?: boolean
): ReactNode | undefined {
  if (!label) {
    return undefined;
  }
  if (!required) {
    return label;
  }

  if ("string" === typeof label) {
    return label + " \u00a0*";
  }
  return (
    <>
      {label}
      {"\u00a0*"}
    </>
  );
}

export type IRenderFormField<
  FieldElementProps extends IFieldElementProps,
  Value extends IFormFieldValue
> = ComponentType<IFormFieldPropsEnhanced<FieldElementProps, Value>>;

export function RenderFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({ field: { label, ...props } }: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
  let fieldContent = (
    <>
      <FormFieldInput {...props} />
      <FormErrorMessage name={props.name} />
    </>
  );

  if (props.type === "hidden") {
    return fieldContent;
  }

  const labelContent = getFormFieldLabelContent(label, props.required);

  if (labelContent) {
    fieldContent = (
      <label>
        {labelContent} {fieldContent}
      </label>
    );
  }

  return <div>{fieldContent}</div>;
}
