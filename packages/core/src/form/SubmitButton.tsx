import React, { ButtonHTMLAttributes, ComponentType, DetailedHTMLProps, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type ISubmitButtonProps<
  SubmitButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = {
  type: 'submit';
} & Omit<SubmitButtonProps, 'type'>;

export function SubmitButton(props: ISubmitButtonProps) {
  return <button {...props} />;
}

export type IRenderSubmitButtonProps<
  SubmitButtonProps extends ISubmitButtonProps = ISubmitButtonProps
> = Omit<SubmitButtonProps, 'type'> & {
  submitButton: true | string | ReactNode;
  Component: ComponentType<SubmitButtonProps>;
};

export function renderSubmitButton<
  SubmitButtonProps extends ISubmitButtonProps = ISubmitButtonProps
>({
  submitButton,
  Component,
  ...props
}: IRenderSubmitButtonProps<SubmitButtonProps>): ReactNode | undefined {
  const { t } = useTranslation();
  const buttonProps: SubmitButtonProps = (props as unknown) as SubmitButtonProps;
  switch (typeof submitButton) {
    case 'boolean':
      buttonProps.children = t('Save');
      break;
    case 'string':
      buttonProps.children = submitButton;
      break;
    default:
      return submitButton;
  }
  return <Component {...buttonProps} type="submit" />;
}
