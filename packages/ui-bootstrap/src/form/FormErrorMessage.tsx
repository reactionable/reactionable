import {
  FormErrorMessage as CoreFormErrorMessage,
  IFormErrorMessageProps as ICoreFormErrorMessageProps,
} from "@reactionable/core/lib/form/FormErrorMessage";
import { ReactElement } from "react";
import Feedback from "react-bootstrap/Feedback";

export type IFormErrorMessageProps = ICoreFormErrorMessageProps;

export function FormErrorMessage({ children, ...props }: IFormErrorMessageProps): ReactElement {
  return (
    <CoreFormErrorMessage {...props}>
      {children ?? ((errorMessage: string) => <Feedback type="invalid">{errorMessage}</Feedback>)}
    </CoreFormErrorMessage>
  );
}
