import {
  Create as CreateCore,
  ICreateProps as ICoreCreateProps,
} from "@reactionable/core/lib/crud/create/Create";
import { IFormData, IFormValues } from "@reactionable/core/lib/form/Form";
import React, { PropsWithChildren, ReactElement } from "react";

import { IFormButtonProps } from "../../form/FormButton";
import { IModalProps } from "../../modal/Modal";

export type ICreateProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
> = ICoreCreateProps<Values, Data, FormButtonProps, ModalProps>;

export function Create<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps,
  ModalProps extends IModalProps = IModalProps
>(props: PropsWithChildren<ICreateProps<Values, Data, FormButtonProps, ModalProps>>): ReactElement {
  return <CreateCore<Values, Data, FormButtonProps, ModalProps> {...props} />;
}
