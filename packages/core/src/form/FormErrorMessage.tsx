import { ErrorMessage, ErrorMessageProps } from "formik";
import { ReactElement } from "react";

export type IFormErrorMessageProps = ErrorMessageProps;

export function FormErrorMessage({ children, ...props }: IFormErrorMessageProps): ReactElement {
  return (
    <ErrorMessage {...props}>
      {children ?? ((errorMessage: string) => <p>{errorMessage}</p>)}
    </ErrorMessage>
  );
}
