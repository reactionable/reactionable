import React, { FC, PropsWithChildren } from 'react';

import { ConfirmationAction, IConfirmationActionProps } from '../../ui/confirmation/Confirmation';

export interface IDeleteProps<Data> extends IConfirmationActionProps<Data> {}

export type DeleteComponent<Data> = FC<IDeleteProps<Data>>;

export function Delete<Data>(props: PropsWithChildren<IDeleteProps<Data>>) {
  return <ConfirmationAction {...props} />;
}
