import {
  renderSubmitButton as coreRenderSubmitButton,
  ISubmitButtonProps as ICoreSubmitButtonProps,
  IRenderSubmitButtonProps as ICoreRenderSubmitButtonProps,
} from '@reactionable/core/lib/form/SubmitButton';
import React, { ReactNode } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';

export type ISubmitButtonProps = ICoreSubmitButtonProps<ButtonProps>;

export function SubmitButton(props: ISubmitButtonProps) {
  return <Button variant="primary" {...props} />;
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
