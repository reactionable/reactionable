import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  IErrorNotificationProps as ICoreErrorNotificationProps,
  IUseErrorNotificationProps as ICoreUseErrorNotificationProps,
  IUseErrorNotificationResult,
  useErrorNotification as useCoreErrorNotification,
  ErrorNotificationComponent,
} from "@reactionable/core/lib/ui/notification/ErrorNotification";
import { ReactElement } from "react";

import { ErrorAlert } from "../alert/ErrorAlert";
import { Notification } from "./Notification";

export type IErrorNotificationProps = ICoreErrorNotificationProps;

export const ErrorNotification: ErrorNotificationComponent = ({
  title,
  children,
  ...props
}: IErrorNotificationProps): ReactElement => {
  const { t } = useTranslation();
  if (!title) {
    title = t("An error has occured");
  }

  return (
    <Notification variant="danger" title={title} {...props}>
      <ErrorAlert className="mb-0">{children}</ErrorAlert>
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
