import { IFormData, IFormValues } from "@reactionable/core/lib/form/Form";
import { IUseModalResult } from "@reactionable/core/lib/ui/modal/Modal";
import {
  IUseModalFormProps as ICoreUseModalFormProps,
  useModalForm as useCoreModalForm,
} from "@reactionable/core/lib/ui/modal/useModalForm";

import { IFormButtonProps } from "../form/FormButton";
import { IModalProps } from "./Modal";
import { ModalForm } from "./ModalForm";

export type IUseModalFormProps<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
> = ICoreUseModalFormProps<Values, Data, FormButtonProps, ModalProps>;

export function useModalForm<
  Values extends IFormValues,
  Data extends IFormData,
  FormButtonProps extends IFormButtonProps,
  ModalProps extends IModalProps
>(props: IUseModalFormProps<Values, Data, FormButtonProps, ModalProps>): IUseModalResult {
  return useCoreModalForm<Values, Data, FormButtonProps, ModalProps>({
    ...props,
    Component: ModalForm,
  });
}
