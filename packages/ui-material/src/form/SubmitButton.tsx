import Button, { ButtonProps } from '@material-ui/core/Button/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  IRenderSubmitButtonProps as ICoreRenderSubmitButtonProps,
  ISubmitButtonProps as ICoreSubmitButtonProps,
  renderSubmitButton as coreRenderSubmitButton,
} from '@reactionable/core/lib/form/SubmitButton';
import React, { ReactNode } from 'react';

export type ISubmitButtonProps = ICoreSubmitButtonProps<ButtonProps>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(6, 0, 2),
    },
  })
);

export function SubmitButton(props: ISubmitButtonProps) {
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

export type IRenderSubmitButtonProps = Omit<
  ICoreRenderSubmitButtonProps<ISubmitButtonProps>,
  'Component'
>;

export function renderSubmitButton(props: IRenderSubmitButtonProps): ReactNode | undefined {
  return coreRenderSubmitButton({
    ...props,
    Component: SubmitButton,
  });
}
