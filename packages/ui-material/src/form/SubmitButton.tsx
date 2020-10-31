import Button, { ButtonProps } from '@material-ui/core/Button/Button';
import {
  renderSubmitButton as coreRenderSubmitButton,
  ISubmitButtonProps as ICoreSubmitButtonProps,
  IRenderSubmitButtonProps as ICoreRenderSubmitButtonProps,
} from '@reactionable/core/lib/form/SubmitButton';
import React, { ReactNode } from 'react';

export type ISubmitButtonProps = ICoreSubmitButtonProps<ButtonProps>;

export function SubmitButton(props: ISubmitButtonProps) {
  return <Button color="primary" {...props} />;
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
