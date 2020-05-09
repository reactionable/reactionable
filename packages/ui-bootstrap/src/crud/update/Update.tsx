import React, { FC, PropsWithChildren } from 'react';
import { ICreateProps, Create } from '../create/Create';

export interface IUpdateProps<Values, Data> extends ICreateProps<Values, Data> {}

export type UpdateComponent<Values, Data> = FC<IUpdateProps<Values, Data>>;
export function Update<Values, Data>(props: PropsWithChildren<IUpdateProps<Values, Data>>) {
  return <Create<Values, Data> {...props} />;
}
