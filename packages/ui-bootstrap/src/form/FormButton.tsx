import {
  IFormButtonProps as ICoreFormButtonProps,
  IUseFormButtonProps as ICoreUseFormButtonProps,
  IUseSubmitFormButtonProps as ICoreUseSubmitFormButtonProps,
  useFormButton as coreUseFormButton,
  useSubmitFormButton as coreUseSubmitFormButton,
} from "@reactionable/core";
import { ComponentProps, ReactElement, ReactNode } from "react";
import Button from "react-bootstrap/Button";

type IButtonProps = ComponentProps<typeof Button>;

export type IFormButtonProps = ICoreFormButtonProps & Omit<IButtonProps, "type">;

export function FormButton(props: IFormButtonProps): ReactElement {
  return <Button variant="primary" {...props} />;
}

export type IUseFormButtonProps = ICoreUseFormButtonProps<IFormButtonProps>;

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
