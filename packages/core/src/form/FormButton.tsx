import React, { ComponentType, DetailedHTMLProps, ReactElement, ReactNode } from "react";

import { useTranslation } from "../i18n/I18n";

type IHtmlFormButtonProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type IFormButtonProps = {
  children: IHtmlFormButtonProps["children"];
  type?: IHtmlFormButtonProps["type"];
  disabled?: IHtmlFormButtonProps["disabled"];
  onClick?: IHtmlFormButtonProps["onClick"];
};

export function FormButton(props: IFormButtonProps): ReactElement {
  return <button {...props} />;
}

export type IUseFormButtonProps<FormButtonProps extends IFormButtonProps> = FormButtonProps & {
  Component?: ComponentType<FormButtonProps>;
};

export function useFormButton<FormButtonProps extends IFormButtonProps>({
  Component,
  ...props
}: IUseFormButtonProps<FormButtonProps>): ReactNode | undefined {
  if (!Component) {
    Component = FormButton;
  }
  const componentProps: FormButtonProps = (props as unknown) as FormButtonProps;
  return <Component type="button" {...componentProps} />;
}

export type IUseSubmitFormButtonProps<
  FormButtonProps extends IFormButtonProps = IFormButtonProps
> = Omit<IUseFormButtonProps<FormButtonProps>, "type">;

export function useSubmitFormButton<FormButtonProps extends IFormButtonProps>({
  children,
  ...props
}: IUseSubmitFormButtonProps<FormButtonProps>): ReactNode | undefined {
  const { t } = useTranslation();
  switch (typeof children) {
    case "boolean":
      children = t("Save");
      break;
  }

  return useFormButton<FormButtonProps>({
    ...props,
    children,
    type: "submit",
  } as IUseFormButtonProps<FormButtonProps>);
}
