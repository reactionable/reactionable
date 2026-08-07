import {
	type IUseWarningAlertProps as ICoreUseWarningAlertProps,
	type IUseWarningAlertResult,
	useWarningAlert as useCoreWarningAlert,
	type WarningAlertComponent,
} from "@reactionable/core";

import { Alert, type IAlertProps } from "./Alert";

export const WarningAlert: WarningAlertComponent = (props) => {
	return <Alert severity="warning" {...props} />;
};

export type IUseWarningAlertProps = IAlertProps & ICoreUseWarningAlertProps;
export const useWarningAlert = (
	props?: IAlertProps,
): IUseWarningAlertResult => {
	return useCoreWarningAlert<IUseWarningAlertProps>({
		Component: WarningAlert,
		...props,
	});
};
