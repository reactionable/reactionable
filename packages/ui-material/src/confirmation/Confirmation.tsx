import Button, { type ButtonProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { type PaperProps } from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
	type ConfirmationComponent,
	ConfirmationAction as CoreConfirmationAction,
	type IConfirmationActionProps as ICoreConfirmationActionProps,
	type IConfirmationProps as ICoreConfirmationProps,
	type IUseConfirmationProps as ICoreUseConfirmationProps,
	type IUseConfirmationResult,
	keyFromSelector,
	useConfirmation as useConfirmationCore,
	useTranslation,
} from "@reactionable/core";
import type { PropsWithChildren, ReactElement } from "react";
import Draggable from "react-draggable";

import { Icon, type IIconProps } from "../icon/Icon";

export type IConfirmationProps = ICoreConfirmationProps;

function PaperComponent(props: PaperProps) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

export const Confirmation: ConfirmationComponent = ({
	callback,
	children,
	title,
}: PropsWithChildren<IConfirmationProps>) => {
	const { t } = useTranslation("common");
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
	const handleCancel = () => callback(false);
	const handleOk = () => callback(true);

	return (
		<Dialog
			open
			onClose={handleCancel}
			PaperComponent={PaperComponent}
			aria-labelledby="draggable-dialog-title"
			fullScreen={fullScreen}
			fullWidth
		>
			<DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
				{title || t(keyFromSelector(($) => $["Confirm ?"], { ns: "common" }))}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>{children}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel} color="primary">
					{t(keyFromSelector(($) => $.Cancel, { ns: "common" }))}
				</Button>
				<Button onClick={handleOk} color="primary">
					{t(keyFromSelector(($) => $.OK, { ns: "common" }))}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export interface IConfirmationActionProps<Data>
	extends ICoreConfirmationActionProps<Data> {
	label?: string;
	icon?: IIconProps;
	button?: ButtonProps;
}

export function ConfirmationAction<Data>({
	label,
	button,
	icon,
	children,
	...props
}: PropsWithChildren<IConfirmationActionProps<Data>>): ReactElement {
	return (
		<CoreConfirmationAction<Data> {...props}>
			{children}
			{button && (
				<Button title={props.title || ""} {...button}>
					{icon && <Icon {...icon} />}
					{label}
				</Button>
			)}
		</CoreConfirmationAction>
	);
}

export type IUseConfirmationProps = ICoreUseConfirmationProps;
export const useConfirmation = (
	props: IUseConfirmationProps,
): IUseConfirmationResult => {
	return useConfirmationCore<IConfirmationProps>({
		Component: Confirmation,
		...props,
	});
};
