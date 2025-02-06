import { TextField, TextFieldProps } from "@mui/material";

import { IFieldElementProps, IFormFieldPropsEnhanced, IFormFieldValue } from "./FormField";

export function RenderFormFieldText<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue,
>({ field }: { field: IFormFieldPropsEnhanced<FieldElementProps, Value>["field"] }) {
  return <TextField {...(field as TextFieldProps)} />;
}
