import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
	type ErrorAlertComponent as CoreErrorAlertComponent,
	type IErrorAlertProps as ICoreErrorAlertProps,
	type IUseErrorAlertProps as ICoreUseErrorAlertProps,
	type IUseErrorAlertResult,
	printError,
	useErrorAlert as useCoreErrorAlert,
} from "@reactionable/core";

import { Alert, type IAlertProps } from "./Alert";

export type IErrorAlertProps = ICoreErrorAlertProps<IAlertProps>;
export type ErrorAlertComponent = CoreErrorAlertComponent<IErrorAlertProps>;
export const ErrorAlert: ErrorAlertComponent = ({
	children,
	error,
	...props
}: IErrorAlertProps) => {
	return (
		<Alert variant="danger" icon={{ icon: faExclamationTriangle }} {...props}>
			{error ? printError(error) : children}
		</Alert>
	);
};

export type IUseErrorAlertProps = ICoreUseErrorAlertProps;
export const useErrorAlert = (
	props?: IUseErrorAlertProps,
): IUseErrorAlertResult => {
	return useCoreErrorAlert<IUseErrorAlertProps>({
		Component: ErrorAlert,
		...props,
	});
};
