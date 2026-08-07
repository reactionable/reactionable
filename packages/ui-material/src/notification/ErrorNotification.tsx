import type { SnackbarProps } from "@mui/material/Snackbar";
import {
	type ErrorNotificationComponent,
	type IErrorNotificationProps as ICoreErrorNotificationProps,
	type IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
	type IUseErrorNotificationResult,
	keyFromSelector,
	useErrorNotification as useCoreErrorNotification,
	useTranslation,
} from "@reactionable/core";
import type { ReactElement } from "react";

import type { IAlertProps } from "../alert/Alert";
import { ErrorAlert } from "../alert/ErrorAlert";
import { Notification } from "./Notification";

export type IErrorNotificationProps = ICoreErrorNotificationProps &
	Omit<SnackbarProps, "title"> & { alert?: IAlertProps };

export const ErrorNotification: ErrorNotificationComponent = ({
	title,
	error,
	alert,
	...props
}: IErrorNotificationProps): ReactElement => {
	const { t } = useTranslation("common");
	if (!title) {
		title = t(
			keyFromSelector(($) => $["An error has occured"], { ns: "common" }),
		);
	}

	return (
		<Notification {...props} title={title}>
			<ErrorAlert
				title={title}
				elevation={6}
				variant="filled"
				{...alert}
				onClose={props.onClose}
				error={error}
			/>
		</Notification>
	);
};

export type IUseErrorNotificationProps = ICoreUseErrorNotificationProps &
	IErrorNotificationProps;
export const useErrorNotification = (
	props: IErrorNotificationProps,
): IUseErrorNotificationResult => {
	return useCoreErrorNotification<IUseErrorNotificationProps>({
		...props,
		Component: ErrorNotification,
	} as IUseErrorNotificationProps);
};
