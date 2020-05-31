import React, { PropsWithChildren } from 'react';
import { IModalFormProps, IUseModalFormProps } from '../../modal/ModalForm';
import { IFormProps } from '../../form/Form';
import { Create as CreateCore } from '@reactionable/core';

export interface ICreateProps<Values, Data> {
  modal?: Omit<IUseModalFormProps<IModalFormProps<Values, Data>>, 'form' | 'title'> | true;
  form: IFormProps<Values, Data>;
}

export function Create<Values, Data>(props: PropsWithChildren<ICreateProps<Values, Data>>) {
  return <CreateCore<Values, Data> {...props} />;
}
