import type { ComponentType, PropsWithChildren, ReactElement } from "react";

import {
	ConfirmationAction,
	type IConfirmationActionProps,
} from "../../ui/confirmation/Confirmation";

export type IDeleteProps<Data = unknown> = IConfirmationActionProps<Data>;

export type DeleteComponent<Data = unknown> = ComponentType<IDeleteProps<Data>>;

export function Delete<Data = unknown>(
	props: PropsWithChildren<IDeleteProps<Data>>,
): ReactElement {
	return <ConfirmationAction {...props} />;
}
