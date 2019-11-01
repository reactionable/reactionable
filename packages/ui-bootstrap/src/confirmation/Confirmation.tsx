import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useConfirmation as useConfirmationCore, ConfirmationComponent, IUseConfirmationProps } from '@reactionable/core';

export const Confirmation: ConfirmationComponent = (props) => {
  const { t } = useTranslation();

  return <Modal
    show
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={() => props.callback(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">{t('Confirm ?')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    <Modal.Footer>
      <Button variant="outline-primary" onClick={() => props.callback(false)}>{t('Cancel')}</Button>
      <Button variant="primary" onClick={() => props.callback(true)}>{t('OK')}</Button>
    </Modal.Footer>
  </Modal>;
};

export const useConfirmation = (props: IUseConfirmationProps) => {
  return useConfirmationCore({ Component: Confirmation, ...props });
}