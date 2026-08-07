import type { IFormData, IFormValues } from "@reactionable/core";
import type { PropsWithChildren, ReactElement } from "react";

import { Create, type ICreateProps } from "../create/Create";

export type IUpdateProps<
	Values extends IFormValues = IFormValues,
	Data extends IFormData = IFormData,
> = ICreateProps<Values, Data>;

export function Update<
	Values extends IFormValues = IFormValues,
	Data extends IFormData = IFormData,
>(props: PropsWithChildren<IUpdateProps<Values, Data>>): ReactElement {
	return <Create<Values, Data> {...props} />;
}
