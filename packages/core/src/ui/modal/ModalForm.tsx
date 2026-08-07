import type { ComponentType, ReactElement } from "react";

import type { IFormData, IFormValues } from "../../form/Form";
import type { IFormButtonProps } from "../../form/FormButton";
import type { IUseFormProps } from "../../form/useForm";
import { useUIContext } from "../UI";
import type { IUseModalResult } from "./Modal";

export type IModalFormProps<
	Values extends IFormValues,
	Data extends IFormData,
	FormButtonProps extends IFormButtonProps,
> = Omit<IUseFormProps<Values, Data, FormButtonProps>, "title"> & {
	closeModal: IUseModalResult["closeModal"];
	cancelButton?: IFormButtonProps["children"];
};

export type ModalFormComponent<
	Values extends IFormValues,
	Data extends IFormData,
	FormButtonProps extends IFormButtonProps,
> = ComponentType<IModalFormProps<Values, Data, FormButtonProps>>;

export function ModalForm<
	Values extends IFormValues,
	Data extends IFormData,
	FormButtonProps extends IFormButtonProps = IFormButtonProps,
>(props: IModalFormProps<Values, Data, FormButtonProps>): ReactElement {
	const { useForm } = useUIContext();
	return useForm<Values, Data, FormButtonProps>(props);
}
