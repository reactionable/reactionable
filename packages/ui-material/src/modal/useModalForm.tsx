import {
	type IUseModalFormProps as ICoreUseModalFormProps,
	type IFormData,
	type IFormValues,
	type IUseModalResult,
	useModalForm as useCoreModalForm,
} from "@reactionable/core";

import type { IFormButtonProps } from "../form/FormButton";
import type { IModalProps } from "./Modal";
import { ModalForm } from "./ModalForm";

export type IUseModalFormProps<
	Values extends IFormValues,
	Data extends IFormData,
	FormButtonProps extends IFormButtonProps = IFormButtonProps,
	ModalProps extends IModalProps = IModalProps,
> = ICoreUseModalFormProps<Values, Data, FormButtonProps, ModalProps>;

export function useModalForm<
	Values extends IFormValues,
	Data extends IFormData,
	FormButtonProps extends IFormButtonProps,
	ModalProps extends IModalProps,
>(
	props: IUseModalFormProps<Values, Data, FormButtonProps, ModalProps>,
): IUseModalResult {
	return useCoreModalForm<Values, Data, FormButtonProps, ModalProps>({
		...props,
		Component: ModalForm,
	});
}
