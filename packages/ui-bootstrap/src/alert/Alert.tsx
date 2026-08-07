import {
	type IAlertProps as IAlertPropsCore,
	type IUseAlertResult,
	useAlert as useAlertCore,
} from "@reactionable/core";
import type { ComponentType } from "react";
import BootstrapAlert, { type AlertProps } from "react-bootstrap/Alert";

import { Icon, type IIconProps } from "../icon/Icon";

export type IAlertProps = IAlertPropsCore &
	AlertProps & {
		icon?: IIconProps;
	};

export type AlertComponent = ComponentType<IAlertProps>;

export const Alert: AlertComponent = ({
	children,
	icon,
	...props
}: IAlertProps) => {
	return (
		<BootstrapAlert {...props}>
			{icon && <Icon className="me-2" {...icon} />}
			{children}
		</BootstrapAlert>
	);
};

export const useAlert = (props?: IAlertProps): IUseAlertResult => {
	return useAlertCore<IAlertProps>({ Component: Alert, ...props });
};
