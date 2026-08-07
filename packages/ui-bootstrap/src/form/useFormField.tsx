import {
	type IUseFormFieldProps as ICoreUseFormFieldProps,
	type IFormFieldValue,
	useFormField as useCoreFormField,
} from "@reactionable/core";
import type { ReactElement } from "react";

import { FormField, type IFieldElementProps } from "./FormField";

export type IUseFormFieldProps<
	FieldElementProps extends IFieldElementProps = IFieldElementProps,
	Value extends IFormFieldValue = IFormFieldValue,
> = ICoreUseFormFieldProps<FieldElementProps, Value>;

export function useFormField<
	FieldElementProps extends IFieldElementProps = IFieldElementProps,
	Value extends IFormFieldValue = IFormFieldValue,
>(props: IUseFormFieldProps<FieldElementProps, Value>): ReactElement {
	return useCoreFormField<FieldElementProps, Value>({
		Component: FormField,
		...props,
	});
}
