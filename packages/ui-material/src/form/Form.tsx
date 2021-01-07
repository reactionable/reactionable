import {
  Form as CoreForm,
  IFormProps as ICoreFormProps,
  IOnSubmitForm as ICoreOnSubmitForm,
  IFormData,
  IFormValues,
} from "@reactionable/core/lib/form/Form";
import { ReactElement } from "react";

import { FormButton, IFormButtonProps } from "./FormButton";

export type IFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps
> = ICoreFormProps<Values, Data, FormButtonProps>;

export type IOnSubmitForm<Values extends IFormValues, Data extends IFormData> = ICoreOnSubmitForm<
  Values,
  Data
>;

export function Form<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps
>(props: IFormProps<Values, Data, FormButtonProps>): ReactElement {
  return <CoreForm<Values, Data, FormButtonProps> {...props} FormButtonComponent={FormButton} />;
}
