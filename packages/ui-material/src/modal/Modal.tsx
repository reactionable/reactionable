import Dialog, { DialogProps } from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import {
  IModalProps as ICoreModalProps,
  IUseModalProps as ICoreUseModalProps,
  useModal as useCoreModal,
} from '@reactionable/core/lib/ui/modal/Modal';
import React, { ComponentType, ReactNode, useState } from 'react';

export type IModalProps = ICoreModalProps &
  Omit<DialogProps, 'open'> & {
    body?: ReactNode;
    footer?: ReactNode;
  };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export type ModalComponent = ComponentType<IModalProps>;
export const Modal: ModalComponent = ({
  title,
  children,
  body,
  footer,
  onHide,
  ...dialogProps
}) => {
  const [show, setShow] = useState(true);
  const classes = useStyles();

  const handleOnClose = () => {
    setShow(false);
    onHide && onHide();
  };

  return (
    <Dialog
      {...dialogProps}
      open={show}
      onClose={handleOnClose}
      aria-labelledby="dialog-title"
      fullScreen
    >
      <DialogTitle id="dialog-title">
        {title}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleOnClose}>
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

export function useModal(props: IUseModalProps) {
  return useCoreModal<IUseModalProps>({
    Component: Modal,
    ...props,
  });
}
