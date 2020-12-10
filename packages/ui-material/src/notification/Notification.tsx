import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Typography from "@material-ui/core/Typography/Typography";
import {
  INotificationProps as ICoreNotificationProps,
  IUseNotificationProps as ICoreUseNotificationProps,
  IUseNotificationResult,
  useNotification as useCoreNotification,
} from "@reactionable/core/lib/ui/notification/Notification";
import {
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
  isValidElement,
  useEffect,
  useState,
} from "react";

export type INotificationProps = ICoreNotificationProps & Omit<SnackbarProps, "children" | "title">;

export const Notification = ({
  onClose,
  title,
  children,
  show = true,
  ...props
}: PropsWithChildren<INotificationProps>): ReactElement => {
  if (!children || !isValidElement(children)) {
    if (title) {
      children = (
        <>
          {"string" === typeof title ? <Typography variant="h5">{title}</Typography> : title}
          <Typography variant="body1">{children}</Typography>
        </>
      );
    }
    children = <SnackbarContent message={children} />;
  }

  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (show !== open) {
      setOpen(show);
    }
  }, [open, show]);

  let firstClickAway = true;
  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      if (firstClickAway) {
        firstClickAway = false;
        return;
      }
    }
    setOpen(false);

    onClose && onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} {...props}>
      {children as ReactElement}
    </Snackbar>
  );
};

export type IUseNotificationProps = ICoreUseNotificationProps<INotificationProps>;

export const useNotification = (props: IUseNotificationProps): IUseNotificationResult => {
  return useCoreNotification<IUseNotificationProps>({
    ...props,
    Component: Notification,
  });
};
