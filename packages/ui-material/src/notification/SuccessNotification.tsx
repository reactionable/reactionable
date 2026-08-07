import type { SnackbarProps } from "@mui/material/Snackbar";
import {
	type ISuccessNotificationProps as ICoreSuccessNotificationProps,
	type IUseSuccessNotificationProps as ICoreUseSuccessNotificationProps,
	type IUseSuccessNotificationResult,
	useSuccessNotification as useCoreSuccessNotification,
} from "@reactionable/core";
import type { PropsWithChildren, ReactElement } from "react";

import { Alert, type IAlertProps } from "../alert/Alert";
import { Notification } from "./Notification";

export type ISuccessNotificationProps = ICoreSuccessNotificationProps &
	Omit<SnackbarProps, "children" | "title"> & { alert?: IAlertProps };

export const SuccessNotification = ({
	children,
	title,
	alert,
	...props
}: PropsWithChildren<ISuccessNotificationProps>): ReactElement => {
	return (
		<Notification title={title} {...props}>
			<Alert
				severity="success"
				title={title}
				elevation={6}
				variant="filled"
				{...alert}
				onClose={props.onClose}
			>
				{children}
			</Alert>
		</Notification>
	);
};

export type IUseSuccessNotificationProps = ICoreUseSuccessNotificationProps &
	ISuccessNotificationProps;
export const useSuccessNotification = (
	props: IUseSuccessNotificationProps,
): IUseSuccessNotificationResult => {
	return useCoreSuccessNotification<ISuccessNotificationProps>({
		...props,
		Component: SuccessNotification,
	});
};
