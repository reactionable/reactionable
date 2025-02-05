import { SnackbarProps } from "@material-ui/core/Snackbar/Snackbar";
import {
  useTranslation,
  ErrorNotificationComponent,
  IErrorNotificationProps as ICoreErrorNotificationProps,
  IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
  IUseErrorNotificationResult,
  useErrorNotification as useCoreErrorNotification,
} from "@reactionable/core";
import { ReactElement } from "react";

import { IAlertProps } from "../alert/Alert";
import { ErrorAlert } from "../alert/ErrorAlert";
import { Notification } from "./Notification";

export type IErrorNotificationProps = ICoreErrorNotificationProps &
  Omit<SnackbarProps, "title"> & { alert?: IAlertProps };

export const ErrorNotification: ErrorNotificationComponent = ({
  title,
  error,
  alert,
  ...props
}: IErrorNotificationProps): ReactElement => {
  const { t } = useTranslation("common");
  if (!title) {
    title = t("An error has occured");
  }

  return (
    <Notification {...props} title={title}>
      <ErrorAlert
        title={title}
        elevation={6}
        variant="filled"
        {...alert}
        onClose={props.onClose}
        error={error}
      />
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
  } as IUseErrorNotificationProps);
};
