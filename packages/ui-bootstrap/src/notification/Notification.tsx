import {
  INotificationProps as ICoreNotificationProps,
  IUseNotificationProps as ICoreUseNotificationProps,
  IUseNotificationResult,
  useNotification as useCoreNotification,
} from "@reactionable/core/lib/ui/notification/Notification";
import { PropsWithChildren, ReactElement } from "react";
import Toast, { ToastProps } from "react-bootstrap/Toast";

export type INotificationProps = ICoreNotificationProps &
  ToastProps & {
    variant?: string;
  };

export function Notification({
  onClose,
  variant,
  title,
  children,
  ...props
}: PropsWithChildren<INotificationProps>): ReactElement {
  return (
    <Toast
      autohide
      onClose={onClose}
      style={{
        position: "fixed",
        top: "1vw",
        right: "1vw",
        zIndex: 9999,
      }}
      className={variant ? "border-" + variant : ""}
      {...props}
    >
      <Toast.Header className={variant ? "text-" + variant : ""}>
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
}

export type IUseNotificationProps = ICoreUseNotificationProps<INotificationProps>;

export const useNotification = (props: IUseNotificationProps): IUseNotificationResult => {
  return useCoreNotification<IUseNotificationProps>({
    ...props,
    Component: Notification,
  });
};
