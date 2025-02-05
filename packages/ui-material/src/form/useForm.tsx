import {
  IFormData,
  IFormValues,
  IUseFormProps as ICoreUseFormProps,
  useForm as useCoreForm,
} from "@reactionable/core";
import { ReactElement } from "react";

import { Form } from "./Form";
import { IFormButtonProps } from "./FormButton";

export type IUseFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
> = ICoreUseFormProps<Values, Data, FormButtonProps>;

export function useForm<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
>(props: IUseFormProps<Values, Data, FormButtonProps>): ReactElement {
  return useCoreForm<Values, Data, FormButtonProps>({
    Component: Form,
    ...props,
  });
}
