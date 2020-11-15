import { IFormData, IFormValues } from "@reactionable/core/lib/form/Form";
import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

import { IFormButtonProps } from "../../form/FormButton";
import { IModalProps } from "../../modal/Modal";
import { Create, ICreateProps } from "../create/Create";

export type IUpdateProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
> = ICreateProps<Values, Data, FormButtonProps, ModalProps>;

export type UpdateComponent<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
> = ComponentType<IUpdateProps<Values, Data, FormButtonProps, ModalProps>>;

export function Update<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps,
  ModalProps extends IModalProps = IModalProps
>(props: PropsWithChildren<IUpdateProps<Values, Data, FormButtonProps, ModalProps>>): ReactElement {
  return <Create<Values, Data, FormButtonProps, ModalProps> {...props} />;
}
