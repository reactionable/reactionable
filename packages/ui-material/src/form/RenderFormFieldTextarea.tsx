import { InputLabel } from "@mui/material";
import TextareaAutosize, { TextareaAutosizeProps } from "@mui/material/TextareaAutosize";
import { getFormFieldLabelContent } from "@reactionable/core";

import { IFieldElementProps, IFormFieldPropsEnhanced, IFormFieldValue } from "./FormField";

export function RenderFormFieldTextarea<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue,
>({
  field: { label, ...field },
  labelId,
}: {
  field: IFormFieldPropsEnhanced<FieldElementProps, Value>["field"];
  labelId?: string;
}) {
  let fieldContent = <TextareaAutosize {...(field as TextareaAutosizeProps)} />;

  const labelContent = getFormFieldLabelContent(label, field.required);
  if (labelContent) {
    fieldContent = (
      <>
        <InputLabel htmlFor={field.id} id={labelId}>
          {labelContent}
        </InputLabel>
        {fieldContent}
      </>
    );
  }
  return fieldContent;
}
