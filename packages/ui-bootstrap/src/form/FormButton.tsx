import {
  IFormButtonProps as ICoreFormButtonProps,
  IUseFormButtonProps as ICoreUseFormButtonProps,
  IUseSubmitFormButtonProps as ICoreUseSubmitFormButtonProps,
  useFormButton as coreUseFormButton,
  useSubmitFormButton as coreUseSubmitFormButton,
} from "@reactionable/core/lib/form/FormButton";
import { ReactElement, ReactNode } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

export type IFormButtonProps = ICoreFormButtonProps & Omit<ButtonProps, "type">;

export function FormButton(props: IFormButtonProps): ReactElement {
  return <Button variant="primary" {...props} />;
}

export type IUseFormButtonProps = Omit<ICoreUseFormButtonProps<IFormButtonProps>, "Component">;

export function useFormButton(props: IUseFormButtonProps): ReactNode | undefined {
  return coreUseFormButton({
    ...props,
    Component: FormButton,
  });
}

export type IUseSubmitFormButtonProps = Omit<
  ICoreUseSubmitFormButtonProps<IFormButtonProps>,
  "Component"
>;
export function useSubmitFormButton(props: IUseSubmitFormButtonProps): ReactNode | undefined {
  return coreUseSubmitFormButton({
    ...props,
    Component: FormButton,
  });
}
