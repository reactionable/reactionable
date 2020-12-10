import { SnackbarProps } from "@material-ui/core/Snackbar/Snackbar";
import {
  ISuccessNotificationProps as ICoreSuccessNotificationProps,
  IUseSuccessNotificationProps as ICoreUseSuccessNotificationProps,
  IUseSuccessNotificationResult,
  useSuccessNotification as useCoreSuccessNotification,
} from "@reactionable/core/lib/ui/notification/SuccessNotification";
import { PropsWithChildren, ReactElement } from "react";

import { Alert, IAlertProps } from "../alert/Alert";
import { Notification } from "./Notification";

export type ISuccessNotificationProps = ICoreSuccessNotificationProps &
  Omit<SnackbarProps, "children" | "title"> & { alert?: IAlertProps };

export const SuccessNotification = ({
  children,
  title,
  alert,
  ...props
}: PropsWithChildren<ISuccessNotificationProps>): ReactElement => {
  return (
    <Notification title={title} {...props}>
      <Alert
        severity="success"
        title={title}
        elevation={6}
        variant="filled"
        {...alert}
        onClose={props.onClose}
      >
        {children}
      </Alert>
    </Notification>
  );
};

export type IUseSuccessNotificationProps = ICoreUseSuccessNotificationProps &
  ISuccessNotificationProps;
export const useSuccessNotification = (
  props: IUseSuccessNotificationProps
): IUseSuccessNotificationResult => {
  return useCoreSuccessNotification<ISuccessNotificationProps>({
    ...props,
    Component: SuccessNotification,
  });
};
