import React, { ComponentType, PropsWithChildren } from 'react';

import { Create, ICreateProps } from '../create/Create';

export interface IUpdateProps<Values, Data> extends ICreateProps<Values, Data> {}

export type UpdateComponent<Values, Data> = ComponentType<IUpdateProps<Values, Data>>;
export function Update<Values, Data>(props: PropsWithChildren<IUpdateProps<Values, Data>>) {
  return <Create<Values, Data> {...props} />;
}
