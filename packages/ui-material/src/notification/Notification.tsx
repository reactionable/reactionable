import Snackbar, { SnackbarCloseReason, SnackbarProps } from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";
import {
  INotificationProps as ICoreNotificationProps,
  IUseNotificationProps as ICoreUseNotificationProps,
  IUseNotificationResult,
  useNotification as useCoreNotification,
} from "@reactionable/core";
import {
  ForwardedRef,
  PropsWithChildren,
  ReactElement,
  forwardRef,
  isValidElement,
  useEffect,
  useState,
} from "react";

export type INotificationProps = ICoreNotificationProps & Omit<SnackbarProps, "children" | "title">;

type WrappedSnackbarContentProps = PropsWithChildren<Pick<INotificationProps, "title">>;

const WrappedSnackbarContent = forwardRef<unknown, WrappedSnackbarContentProps>(
  function WrappedChildren({ children, title }: WrappedSnackbarContentProps, ref) {
    if (title) {
      children = (
        <>
          {"string" === typeof title ? <Typography variant="h5">{title}</Typography> : title}
          <Typography variant="body1">{children}</Typography>
        </>
      );
    }

    if (!children) {
      return null;
    }

    if (!title && isValidElement(children)) {
      return <div ref={ref as ForwardedRef<HTMLDivElement>}>{children}</div>;
    }

    return <SnackbarContent ref={ref as ForwardedRef<HTMLDivElement>} message={children} />;
  }
);

export const Notification = ({
  onClose,
  title,
  children,
  show = true,
  ...props
}: PropsWithChildren<INotificationProps>): ReactElement => {
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (show !== open) {
      setOpen(show);
    }
  }, [open, show]);

  let firstClickAway = true;
  const handleClose: SnackbarProps["onClose"] = (event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      if (firstClickAway) {
        firstClickAway = false;
        return;
      }
    }
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  const snackbarProps: SnackbarProps = {
    open,
    autoHideDuration: 6000,
    onClose: handleClose,
    ...props,
  };

  return (
    <Snackbar {...snackbarProps}>
      <WrappedSnackbarContent title={title}>{children}</WrappedSnackbarContent>
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
