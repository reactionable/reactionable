import {
	Create as CreateCore,
	type ICreateProps as ICoreCreateProps,
	type IFormData,
	type IFormValues,
} from "@reactionable/core";
import type { PropsWithChildren, ReactElement } from "react";

import type { IFormButtonProps } from "../../form/FormButton";
import type { IModalProps } from "../../modal/Modal";

export type ICreateProps<
	Values extends IFormValues = IFormValues,
	Data extends IFormData = IFormValues,
> = ICoreCreateProps<Values, Data, IFormButtonProps, IModalProps>;

export function Create<
	Values extends IFormValues = IFormValues,
	Data extends IFormData = IFormData,
>(props: PropsWithChildren<ICreateProps<Values, Data>>): ReactElement {
	return <CreateCore<Values, Data, IFormButtonProps, IModalProps> {...props} />;
}
