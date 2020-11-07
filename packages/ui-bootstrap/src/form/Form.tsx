import {
  Form as CoreForm,
  IFormProps as ICoreFormProps,
  IOnSubmitForm as ICoreOnSubmitForm,
  useForm as useCoreForm,
} from '@reactionable/core/lib/form/Form';
import React, { PropsWithChildren } from 'react';

import { SubmitButton } from './SubmitButton';

export type IFormProps<Values, Data> = ICoreFormProps<Values, Data>;

export type IOnSubmitForm<Values, Data> = ICoreOnSubmitForm<Values, Data>;

export function Form<Values, Data>(props: PropsWithChildren<IFormProps<Values, Data>>) {
  return (
    <CoreForm<Values, Data>
      {...props}
      form={{ className: 'needs-validation mb-1', ...props.form }}
      submitButtonComponent={SubmitButton}
    />
  );
}

export type IUseFormProps<Values = any, Data = any> = PropsWithChildren<IFormProps<Values, Data>>;

export function useForm<Values, Data>(props: IUseFormProps<Values, Data>) {
  return useCoreForm<IUseFormProps<Values, Data>>({
    Component: Form,
    ...props,
  });
}
