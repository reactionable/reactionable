import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

import { ConfirmationAction, IConfirmationActionProps } from "../../ui/confirmation/Confirmation";

export type IDeleteProps<Data> = IConfirmationActionProps<Data>;

export type DeleteComponent<Data> = ComponentType<IDeleteProps<Data>>;

export function Delete<Data>(props: PropsWithChildren<IDeleteProps<Data>>): ReactElement {
  return <ConfirmationAction {...props} />;
}
