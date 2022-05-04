import Button, { ButtonProps } from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  ConfirmationComponent,
  ConfirmationAction as CoreConfirmationAction,
  IConfirmationActionProps as ICoreConfirmationActionProps,
  IConfirmationProps as ICoreConfirmationProps,
  IUseConfirmationProps as ICoreUseConfirmationProps,
  IUseConfirmationResult,
  useConfirmation as useConfirmationCore,
} from "@reactionable/core/lib/ui/confirmation/Confirmation";
import { PropsWithChildren, ReactElement } from "react";
import Draggable from "react-draggable";

// FIXME: Until this PR is merged https://github.com/react-grid-layout/react-draggable/pull/648
declare module "react-draggable" {
  export interface DraggableProps {
    children: React.ReactNode;
  }
}

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
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
