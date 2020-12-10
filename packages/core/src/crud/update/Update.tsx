import { ComponentType, PropsWithChildren, ReactElement } from "react";

import { IFormData, IFormValues } from "../../form/Form";
import { IFormButtonProps } from "../../form/FormButton";
import { IModalProps } from "../../ui/modal/Modal";
import { Create, ICreateProps } from "../create/Create";

export type IUpdateProps<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData,
  FormButtonProps extends IFormButtonProps = IFormButtonProps,
  ModalProps extends IModalProps = IModalProps
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
  return <Create<Values, Data, FormButtonProps> {...props} />;
}
