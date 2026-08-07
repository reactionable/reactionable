import {
	FormField as CoreFormField,
	type IFieldElementProps as ICoreFieldElementProps,
	type IFormFieldProps as ICoreFormFieldProps,
	type IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
	type IFormFieldValue,
	type IRenderFormField,
} from "@reactionable/core";
import type { ReactElement, ReactNode } from "react";

import { RenderFormField } from "./RenderFormField";

export type IFieldElementProps = ICoreFieldElementProps;

export type IFormFieldProps<
	FieldElementProps extends IFieldElementProps,
	Value extends IFormFieldValue,
> = Omit<ICoreFormFieldProps<FieldElementProps, Value>, "children"> & {
	children?: IRenderFormField<FieldElementProps, Value> | ReactNode;
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
