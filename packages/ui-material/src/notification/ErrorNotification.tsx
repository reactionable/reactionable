import { SnackbarProps } from "@material-ui/core/Snackbar/Snackbar";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  IErrorNotificationProps as ICoreErrorNotificationProps,
  IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
  IUseErrorNotificationResult,
  useErrorNotification as useCoreErrorNotification,
} from "@reactionable/core/lib/ui/notification/ErrorNotification";
import { PropsWithChildren, ReactElement } from "react";

import { IAlertProps } from "../alert/Alert";
import { ErrorAlert } from "../alert/ErrorAlert";
import { Notification } from "./Notification";

export type IErrorNotificationProps = ICoreErrorNotificationProps &
  Omit<SnackbarProps, "children" | "title"> & { alert?: IAlertProps };

export const ErrorNotification = ({
  title,
  children,
  alert,
  ...props
}: PropsWithChildren<IErrorNotificationProps>): ReactElement => {
  const { t } = useTranslation();
  if (!title) {
    title = t("An error has occured");
  }

  return (
    <Notification {...props} title={title}>
      <ErrorAlert title={title} elevation={6} variant="filled" {...alert} onClose={props.onClose}>
        {children}
      </ErrorAlert>
    </Notification>
  );
};

export type IUseErrorNotificationProps = ICoreUseErrorNotificationProps & IErrorNotificationProps;
export const useErrorNotification = (
  props: IErrorNotificationProps
): IUseErrorNotificationResult => {
  return useCoreErrorNotification<IUseErrorNotificationProps>({
    ...props,
    Component: ErrorNotification,
  });
};
