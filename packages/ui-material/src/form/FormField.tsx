import type {
	CheckboxProps,
	SelectProps,
	TextareaAutosizeProps,
	TextFieldProps,
} from "@mui/material";
import {
	FormField as CoreFormField,
	type IFieldElementProps as ICoreFieldElementProps,
	type IFormFieldProps as ICoreFormFieldProps,
	type IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
	type IFormFieldValue as ICoreFormFieldValue,
	type IRenderFormField,
} from "@reactionable/core";
import type { ReactElement, ReactNode } from "react";

import { RenderFormField } from "./RenderFormField";

type MaterialFieldProps =
	| TextFieldProps
	| CheckboxProps
	| SelectProps
	| TextareaAutosizeProps;

export type IFieldElementProps = ICoreFieldElementProps & MaterialFieldProps;

export type IFormFieldValue = ICoreFormFieldValue;

export type IFormFieldProps<
	FieldElement extends IFieldElementProps,
	Value extends IFormFieldValue,
> = Omit<ICoreFormFieldProps<FieldElement, Value>, "children"> & {
	children?: IRenderFormField<IFieldElementProps, Value> | ReactNode;
};

export type IFormFieldPropsEnhanced<
	FieldElement extends IFieldElementProps,
	Value extends IFormFieldValue,
> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

export function FormField<
	FieldElementProps extends IFieldElementProps = IFieldElementProps,
	Value extends IFormFieldValue = IFormFieldValue,
>(props: IFormFieldProps<FieldElementProps, Value>): ReactElement {
	const formFieldProps = {
		...props,
		render: RenderFormField,
	} as ICoreFormFieldProps<FieldElementProps, Value>;

	return <CoreFormField {...formFieldProps} />;
}
