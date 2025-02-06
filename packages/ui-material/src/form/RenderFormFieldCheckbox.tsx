import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getFormFieldLabelContent } from "@reactionable/core";
import { isValidElement } from "react";

import { IFieldElementProps, IFormFieldPropsEnhanced, IFormFieldValue } from "./FormField";

export function RenderFormFieldCheckbox<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue,
>({
  field: { label, ...field },
}: {
  field: IFormFieldPropsEnhanced<FieldElementProps, Value>["field"];
}) {
  const labelContent = getFormFieldLabelContent(label, field.required);

  const formControlLabel =
    "string" === typeof labelContent ||
    "number" === typeof labelContent ||
    isValidElement(labelContent) ? (
      labelContent
    ) : (
      <>{labelContent}</>
    );

  return (
    <FormControlLabel
      disabled={field.disabled}
      control={<Checkbox {...(field as CheckboxProps)} />}
      label={formControlLabel}
    />
  );
}
