import { ReactElement } from "react";

import { Form, FormComponent, IFormData, IFormProps, IFormValues } from "./Form";
import { IFormButtonProps } from "./FormButton";

export type IUseFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
> = IFormProps<Values, Data, FormButtonProps> & {
  Component?: FormComponent<Values, Data, FormButtonProps>;
};

export type IUseFormResult = ReactElement;

export function useForm<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps
>({ Component, ...props }: IUseFormProps<Values, Data, FormButtonProps>): IUseFormResult {
  if (!Component) {
    Component = Form;
  }

  return <Component {...props} />;
}
