import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
	type IUseWarningAlertProps as ICoreUseWarningAlertProps,
	type IUseWarningAlertResult,
	useWarningAlert as useCoreWarningAlert,
	type WarningAlertComponent,
} from "@reactionable/core";

import { Alert, type IAlertProps } from "./Alert";

export const WarningAlert: WarningAlertComponent = (props) => {
	return (
		<Alert
			variant="warning"
			icon={{ icon: faExclamationTriangle }}
			{...props}
		/>
	);
};

export type IUseWarningAlertProps = ICoreUseWarningAlertProps & IAlertProps;
export const useWarningAlert = (
	props?: IAlertProps,
): IUseWarningAlertResult => {
	return useCoreWarningAlert<IUseWarningAlertProps>({
		Component: WarningAlert,
		...props,
	});
};
