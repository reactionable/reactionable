import React, { PropsWithChildren } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import {
  useConfirmation as useConfirmationCore,
  ConfirmationComponent,
  IUseConfirmationProps as ICoreUseConfirmationProps,
  IConfirmationProps as ICoreConfirmationProps,
  IConfirmationActionProps as ICoreConfirmationActionProps,
  ConfirmationAction as CoreConfirmationAction,
} from '@reactionable/core';
import { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type IConfirmationProps = ICoreConfirmationProps;

export const Confirmation: ConfirmationComponent = ({ callback, children, title }) => {
  const { t } = useTranslation();

  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => callback(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title || t('Confirm ?')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => callback(false)}>
          {t('Cancel')}
        </Button>
        <Button variant="primary" onClick={() => callback(true)}>
          {t('OK')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export interface IConfirmationActionProps<Data> extends ICoreConfirmationActionProps<Data> {
  label?: string;
  icon?: FontAwesomeIconProps;
  button?: ButtonProps;
}

export function ConfirmationAction<Data>({
  label,
  button,
  icon,
  children,
  ...props
}: PropsWithChildren<IConfirmationActionProps<Data>>) {
  return (
    <CoreConfirmationAction<Data> {...props}>
      {children}
      {button && (
        <Button title={props.title || ''} {...button}>
          {icon && <FontAwesomeIcon {...icon} />}
          {label}
        </Button>
      )}
    </CoreConfirmationAction>
  );
}

export type IUseConfirmationProps = ICoreUseConfirmationProps & {};
export const useConfirmation = (props: IUseConfirmationProps) => {
  return useConfirmationCore<IConfirmationProps>({ Component: Confirmation, ...props });
};
