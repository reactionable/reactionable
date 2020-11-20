import { IFormData, IFormValues } from "@reactionable/core/lib/form/Form";
import React, { PropsWithChildren, ReactElement } from "react";

import { Create, ICreateProps } from "../create/Create";

export type IUpdateProps<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData
> = ICreateProps<Values, Data>;

export function Update<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData
>(props: PropsWithChildren<IUpdateProps<Values, Data>>): ReactElement {
  return <Create<Values, Data> {...props} />;
}
