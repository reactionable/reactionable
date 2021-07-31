import Button, { ButtonProps } from "@material-ui/core/Button/Button";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  IFormButtonProps as ICoreFormButtonProps,
  IUseFormButtonProps as ICoreUseFormButtonProps,
  IUseSubmitFormButtonProps as ICoreUseSubmitFormButtonProps,
  useFormButton as coreUseFormButton,
  useSubmitFormButton as coreUseSubmitFormButton,
} from "@reactionable/core/lib/form/FormButton";
import { ReactElement, ReactNode } from "react";

export type IFormButtonProps = ICoreFormButtonProps & ButtonProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(5, 0, 2),
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
      classes={classes}
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
