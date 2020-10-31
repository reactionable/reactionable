import { Create as CreateCore } from '@reactionable/core/lib/crud/create/Create';
import { IUseModalFormProps } from '@reactionable/core/lib/ui/modal/useModalForm';
import React, { PropsWithChildren } from 'react';

import { IFormProps } from '../../form/Form';
import { IModalFormProps } from '../../modal/ModalForm';

export interface ICreateProps<Values, Data> {
  modal?: Omit<IUseModalFormProps<IModalFormProps<Values, Data>>, 'form' | 'title'> | true;
  form: IFormProps<Values, Data>;
}

export function Create<Values, Data>(props: PropsWithChildren<ICreateProps<Values, Data>>) {
  return <CreateCore<Values, Data> {...props} />;
}
