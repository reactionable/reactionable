import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  ConfirmationComponent,
  ConfirmationAction as CoreConfirmationAction,
  IConfirmationActionProps as ICoreConfirmationActionProps,
  IConfirmationProps as ICoreConfirmationProps,
  IUseConfirmationProps as ICoreUseConfirmationProps,
  IUseConfirmationResult,
  useConfirmation as useConfirmationCore,
} from "@reactionable/core/lib/ui/confirmation/Confirmation";
import { PropsWithChildren, ReactElement } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { IIconProps, Icon } from "../icon/Icon";

export type IConfirmationProps = ICoreConfirmationProps;

export const Confirmation: ConfirmationComponent = ({
  callback,
  children,
  title,
}: PropsWithChildren<IConfirmationProps>) => {
  const { t } = useTranslation();
  const handleCancel = () => callback(false);
  const handleOk = () => callback(true);

  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title || t("Confirm ?")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={handleCancel}>
          {t("Cancel")}
        </Button>
        <Button variant="primary" onClick={handleOk}>
          {t("OK")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export interface IConfirmationActionProps<Data> extends ICoreConfirmationActionProps<Data> {
  label?: string;
  icon?: IIconProps;
  button?: ButtonProps;
}

export function ConfirmationAction<Data>({
  label,
  button,
  icon,
  children,
  ...props
}: PropsWithChildren<IConfirmationActionProps<Data>>): ReactElement {
  return (
    <CoreConfirmationAction<Data> {...props}>
      {children}
      {button && (
        <Button title={props.title || ""} {...button}>
          {icon && <Icon {...icon} />}
          {label}
        </Button>
      )}
    </CoreConfirmationAction>
  );
}

export type IUseConfirmationProps = ICoreUseConfirmationProps;
export const useConfirmation = (props: IUseConfirmationProps): IUseConfirmationResult => {
  return useConfirmationCore<IConfirmationProps>({ Component: Confirmation, ...props });
};
