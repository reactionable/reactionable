import Button, { ButtonProps } from "@mui/material/Button";
import {
  IFormButtonProps as ICoreFormButtonProps,
  IUseFormButtonProps as ICoreUseFormButtonProps,
  IUseSubmitFormButtonProps as ICoreUseSubmitFormButtonProps,
  useFormButton as coreUseFormButton,
  useSubmitFormButton as coreUseSubmitFormButton,
} from "@reactionable/core";
import { ReactElement, ReactNode } from "react";

export type IFormButtonProps = ICoreFormButtonProps & ButtonProps;

export function FormButton(props: IFormButtonProps): ReactElement {
  return (
    <Button
      color="primary"
      fullWidth
      variant="contained"
      size="large"
      sx={{
        margin: (theme) => theme.spacing(5, 0, 2),
      }}
      {...props}
    />
  );
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
