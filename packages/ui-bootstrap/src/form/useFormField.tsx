import { IFormFieldValue } from "@reactionable/core/lib/form/FormField";
import {
  IUseFormFieldProps as ICoreUseFormFieldProps,
  useFormField as useCoreFormField,
} from "@reactionable/core/lib/form/useFormField";
import { ReactElement } from "react";

import { FormField, IFieldElementProps } from "./FormField";

export type IUseFormFieldProps<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
> = ICoreUseFormFieldProps<FieldElementProps, Value>;

export function useFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>(props: IUseFormFieldProps<FieldElementProps, Value>): ReactElement {
  return useCoreFormField<FieldElementProps, Value>({
    Component: FormField,
    ...props,
  });
}
