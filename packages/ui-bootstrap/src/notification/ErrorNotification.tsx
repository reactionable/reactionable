import {
  useTranslation,
  IErrorNotificationProps as ICoreErrorNotificationProps,
  IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
  IUseErrorNotificationResult,
  useErrorNotification as useCoreErrorNotification,
  ErrorNotificationComponent,
} from "@reactionable/core";
import { ReactElement } from "react";

import { ErrorAlert } from "../alert/ErrorAlert";
import { Notification } from "./Notification";

export type IErrorNotificationProps = ICoreErrorNotificationProps;

export const ErrorNotification: ErrorNotificationComponent = ({
  title,
  error,
  ...props
}: IErrorNotificationProps): ReactElement => {
  const { t } = useTranslation("common");
  if (!title) {
    title = t("An error has occured");
  }

  return (
    <Notification variant="danger" title={title} {...props}>
      <ErrorAlert className="mb-0" error={error} />
    </Notification>
  );
};

export type IUseErrorNotificationProps = ICoreUseErrorNotificationProps &
  Omit<IErrorNotificationProps, "children">;
export const useErrorNotification = (
  props: IErrorNotificationProps
): IUseErrorNotificationResult => {
  return useCoreErrorNotification<IUseErrorNotificationProps>({
    ...props,
    Component: ErrorNotification,
  } as IUseErrorNotificationProps);
};
