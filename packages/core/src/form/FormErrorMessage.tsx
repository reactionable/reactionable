import { ErrorMessage, type ErrorMessageProps } from "formik";
import type { ReactElement } from "react";

export type IFormErrorMessageProps = ErrorMessageProps;

export function FormErrorMessage({
	children,
	...props
}: IFormErrorMessageProps): ReactElement {
	return (
		<ErrorMessage {...props}>
			{children ?? ((errorMessage: string) => <p>{errorMessage}</p>)}
		</ErrorMessage>
	);
}
