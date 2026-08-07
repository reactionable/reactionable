import {
	getFormFieldLabelContent,
	type IFormFieldValue,
} from "@reactionable/core";
import type { ReactElement, ReactNode } from "react";
import FormCheck, { type FormCheckProps } from "react-bootstrap/FormCheck";
import FormControl, {
	type FormControlProps,
} from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

import { FormErrorMessage } from "./FormErrorMessage";
import type { IFieldElementProps, IFormFieldPropsEnhanced } from "./FormField";

export function RenderFormField<
	FieldElementProps extends IFieldElementProps = IFieldElementProps,
	Value extends IFormFieldValue = IFormFieldValue,
>({
	isValid,
	isInvalid,
	field: { label, children, ...field },
}: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
	let input: ReactNode;

	const fieldProps = {
		...field,
		isValid,
		isInvalid,
	};

	const labelContent = getFormFieldLabelContent(label, field.required);

	if (field.type === "checkbox") {
		input = (
			<FormCheck {...(fieldProps as FormCheckProps)} label={labelContent}>
				{children}
			</FormCheck>
		);
	} else if (typeof children === "function") {
		input = children(field);
	} else {
		input = (
			<FormControl {...(fieldProps as FormControlProps)}>
				{children}
			</FormControl>
		);
		if (labelContent) {
			input = (
				<>
					<FormLabel>{labelContent}</FormLabel>
					{input}
				</>
			);
		}
	}

	const fieldContent = (
		<>
			{input}
			<FormErrorMessage name={fieldProps.name} />
		</>
	);

	if (field.type === "hidden") {
		return fieldContent;
	}

	return <FormGroup controlId={field.name}>{fieldContent}</FormGroup>;
}
