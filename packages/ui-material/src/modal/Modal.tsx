import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import {
  IModalProps as ICoreModalProps,
  IUseModalProps as ICoreUseModalProps,
  IUseModalResult,
  useModal as useCoreModal,
} from "@reactionable/core";
import { ComponentType, ReactNode } from "react";

export type IModalProps = ICoreModalProps &
  Omit<DialogProps, "open" | "title"> & {
    body?: ReactNode;
    footer?: ReactNode;
  };

export type ModalComponent = ComponentType<IModalProps>;
export const Modal: ModalComponent = ({
  title,
  children,
  body,
  footer,
  onHide,
  show: open,
  ...dialogProps
}: IModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleOnClose = () => {
    if (onHide) {
      onHide();
    }
  };

  return (
    <Dialog
      {...dialogProps}
      open={open === undefined ? false : open}
      onClose={handleOnClose}
      aria-labelledby="dialog-title"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogTitle id="dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={handleOnClose}
          size="large"
          sx={{
            position: "absolute",
            right: (theme) => theme.spacing(1),
            top: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
      {body && (
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
      )}
      {footer && <DialogActions>{footer}</DialogActions>}
    </Dialog>
  );
};

export type IUseModalProps = ICoreUseModalProps<IModalProps>;

export function useModal(props: IUseModalProps): IUseModalResult {
  return useCoreModal<IModalProps>({
    Component: Modal,
    ...props,
  });
}
