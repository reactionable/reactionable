import {
	type IUseFormProps as ICoreUseFormProps,
	type IFormData,
	type IFormValues,
	useForm as useCoreForm,
} from "@reactionable/core";
import type { ReactElement } from "react";

import { Form } from "./Form";
import type { IFormButtonProps } from "./FormButton";

export type IUseFormProps<
	Values extends IFormValues,
	Data extends IFormData,
	FormButtonProps extends IFormButtonProps,
> = ICoreUseFormProps<Values, Data, FormButtonProps>;

export function useForm<
	Values extends IFormValues,
	Data extends IFormData,
	FormButtonProps extends IFormButtonProps,
>(props: IUseFormProps<Values, Data, FormButtonProps>): ReactElement {
	return useCoreForm<Values, Data, FormButtonProps>({
		Component: Form,
		...props,
	});
}
