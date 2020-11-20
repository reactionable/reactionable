import {
  Create as CreateCore,
  ICreateProps as ICoreCreateProps,
} from "@reactionable/core/lib/crud/create/Create";
import { IFormData, IFormValues } from "@reactionable/core/lib/form/Form";
import React, { PropsWithChildren, ReactElement } from "react";

import { IFormButtonProps } from "../../form/FormButton";
import { IModalProps } from "../../modal/Modal";

export type ICreateProps<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormValues
> = ICoreCreateProps<Values, Data, IFormButtonProps, IModalProps>;

export function Create<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData
>(props: PropsWithChildren<ICreateProps<Values, Data>>): ReactElement {
  return <CreateCore<Values, Data, IFormButtonProps, IModalProps> {...props} />;
}
