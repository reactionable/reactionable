import { InputLabel } from "@mui/material";
import Select, { SelectProps } from "@mui/material/Select";
import { getFormFieldLabelContent } from "@reactionable/core/lib/form/RenderFormField";

import { IFieldElementProps, IFormFieldPropsEnhanced, IFormFieldValue } from "./FormField";

export function RenderFormFieldSelect<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({
  field: { label, as, ...field },
  labelId,
}: {
  field: IFormFieldPropsEnhanced<FieldElementProps, Value>["field"];
  labelId?: string;
}) {
  const labelContent = getFormFieldLabelContent(label, field.required);

  let fieldContent = <Select {...(field as SelectProps)} label={labelContent} />;

  if (label) {
    fieldContent = (
      <>
        <InputLabel htmlFor={field.id} id={labelId}>
          {label}
        </InputLabel>
        {fieldContent}
      </>
    );
  }

  return fieldContent;
}
