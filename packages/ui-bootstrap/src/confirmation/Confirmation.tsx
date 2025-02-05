import {
  useTranslation,
  ConfirmationComponent,
  ConfirmationAction as CoreConfirmationAction,
  IConfirmationActionProps as ICoreConfirmationActionProps,
  IConfirmationProps as ICoreConfirmationProps,
  IUseConfirmationProps as ICoreUseConfirmationProps,
  IUseConfirmationResult,
  useConfirmation as useConfirmationCore,
} from "@reactionable/core";
import { ComponentProps, ReactElement } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { IIconProps, Icon } from "../icon/Icon";

export type IConfirmationProps = ICoreConfirmationProps;

export const Confirmation: ConfirmationComponent = ({
  callback,
  children,
  title,
}: IConfirmationProps) => {
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

type IButtonProps = ComponentProps<typeof Button>;

export interface IConfirmationActionProps<Data> extends ICoreConfirmationActionProps<Data> {
  label?: string;
  icon?: IIconProps;
  button?: IButtonProps;
}

export function ConfirmationAction<Data>({
  label,
  button,
  icon,
  children,
  ...props
}: IConfirmationActionProps<Data>): ReactElement {
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
