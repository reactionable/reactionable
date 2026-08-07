import { TextField, type TextFieldProps } from "@mui/material";

import type {
	IFieldElementProps,
	IFormFieldPropsEnhanced,
	IFormFieldValue,
} from "./FormField";

export function RenderFormFieldText<
	FieldElementProps extends IFieldElementProps = IFieldElementProps,
	Value extends IFormFieldValue = IFormFieldValue,
>({
	field,
}: {
	field: IFormFieldPropsEnhanced<FieldElementProps, Value>["field"];
}) {
	return <TextField {...(field as TextFieldProps)} />;
}
