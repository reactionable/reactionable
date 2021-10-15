import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import { ReactElement } from "react";

import { IFieldElementProps, IFormFieldPropsEnhanced, IFormFieldValue } from "./FormField";
import { RenderFormFieldCheckbox } from "./RenderFormFieldCheckbox";
import { RenderFormFieldSelect } from "./RenderFormFieldSelect";
import { RenderFormFieldText } from "./RenderFormFieldText";
import { RenderFormFieldTextarea } from "./RenderFormFieldTextarea";

export function RenderFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue,
>({
  error,
  isInvalid,
  field: { children, ...field },
}: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
  let fieldContent: ReactElement;

  if (typeof children === "function") {
    fieldContent = <>{children(field)}</>;
  } else {
    const inputLabelId = field.id ? `${field.id}-label` : undefined;
    const helperTextId = field.id ? `${field.id}-helper-text` : undefined;

    const fieldProps: IFormFieldPropsEnhanced<FieldElementProps, Value>["field"] = {
      ...field,
      children,
    } as IFormFieldPropsEnhanced<FieldElementProps, Value>["field"];

    switch (true) {
      case field.as === "checkbox":
      case field.type === "checkbox":
        fieldContent = <RenderFormFieldCheckbox field={fieldProps} />;
        break;

      case field.as === "select":
        fieldContent = <RenderFormFieldSelect field={fieldProps} labelId={inputLabelId} />;
        break;

      case field.as === "textarea":
        fieldContent = <RenderFormFieldTextarea field={fieldProps} labelId={inputLabelId} />;
        break;

      default:
        fieldContent = <RenderFormFieldText field={fieldProps} />;
    }

    fieldContent = (
      <FormControl
        error={isInvalid}
        disabled={field.disabled}
        required={field.required}
        margin="normal"
      >
        {fieldContent}
        {error && <FormHelperText id={helperTextId}>{error}</FormHelperText>}
      </FormControl>
    );

    if (field.type === "hidden") {
      return fieldContent;
    }
  }

  return <FormGroup>{fieldContent}</FormGroup>;
}
