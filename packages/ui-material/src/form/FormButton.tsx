import Button, { ButtonProps } from "@material-ui/core/Button/Button";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  IFormButtonProps as ICoreFormButtonProps,
  IUseFormButtonProps as ICoreUseFormButtonProps,
  IUseSubmitFormButtonProps as ICoreUseSubmitFormButtonProps,
  useFormButton as coreUseFormButton,
  useSubmitFormButton as coreUseSubmitFormButton,
} from "@reactionable/core/lib/form/FormButton";
import React, { ReactElement, ReactNode } from "react";

export type IFormButtonProps = ICoreFormButtonProps & ButtonProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(6, 0, 2),
    },
  })
);

export function FormButton(props: IFormButtonProps): ReactElement {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      fullWidth
      variant="contained"
      className={classes.margin}
      size="large"
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