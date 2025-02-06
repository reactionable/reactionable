import Button, { ButtonProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  useTranslation,
  ConfirmationComponent,
  ConfirmationAction as CoreConfirmationAction,
  IConfirmationActionProps as ICoreConfirmationActionProps,
  IConfirmationProps as ICoreConfirmationProps,
  IUseConfirmationProps as ICoreUseConfirmationProps,
  IUseConfirmationResult,
  useConfirmation as useConfirmationCore,
} from "@reactionable/core";
import { PropsWithChildren, ReactElement } from "react";
import Draggable from "react-draggable";

import { IIconProps, Icon } from "../icon/Icon";

export type IConfirmationProps = ICoreConfirmationProps;

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
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
        {title || t("Confirm ?")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {t("Cancel")}
        </Button>
        <Button onClick={handleOk} color="primary">
          {t("OK")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface IConfirmationActionProps<Data> extends ICoreConfirmationActionProps<Data> {
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
export const useConfirmation = (props: IUseConfirmationProps): IUseConfirmationResult => {
  return useConfirmationCore<IConfirmationProps>({ Component: Confirmation, ...props });
};
