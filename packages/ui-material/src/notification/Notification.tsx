import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent';
import Typography from '@material-ui/core/Typography/Typography';
import {
  INotificationProps as ICoreNotificationProps,
  useNotification as useCoreNotification,
} from '@reactionable/core/lib/ui/notification/Notification';
import React, { PropsWithChildren } from 'react';

export type INotificationProps = ICoreNotificationProps & Omit<SnackbarProps, 'children' | 'title'>;

export const Notification = ({
  onClose,
  title,
  children,
  ...props
}: PropsWithChildren<INotificationProps>) => {
  let message;
  if (title) {
    message = 'string' === typeof title ? <Typography variant="h3">{title}</Typography> : title;
  }
  if (children) {
    const childrenContent =
      'string' === typeof children ? <Typography variant="body1">{children}</Typography> : children;
    if (message) {
      message = (
        <>
          {message}
          {childrenContent}
        </>
      );
    } else {
      message = childrenContent;
    }
  }

  return (
    <Snackbar open autoHideDuration={6000} onClose={onClose} {...props}>
      {message ? <SnackbarContent message={message} /> : <></>}
    </Snackbar>
  );
};

export const useNotification = (props: INotificationProps) => {
  return useCoreNotification<INotificationProps>({
    ...props,
    Component: Notification,
  });
};
