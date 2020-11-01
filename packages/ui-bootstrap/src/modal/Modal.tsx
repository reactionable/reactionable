import {
  IModalProps as ICoreModalProps,
  IUseModalProps as ICoreUseModalProps,
  useModal as useCoreModal,
} from '@reactionable/core/lib/ui/modal/Modal';
import React, { ComponentType, ReactNode } from 'react';
import BootstrapModal, { ModalProps } from 'react-bootstrap/Modal';

export type IModalProps = ICoreModalProps &
  ModalProps & {
    body?: ReactNode;
    footer?: ReactNode;
  };

export type ModalComponent = ComponentType<IModalProps>;
export const Modal: ModalComponent = ({ title, children, body, footer, onHide, ...modalProps }) => {
  const handleOnClose = () => {
    onHide && onHide();
  };

  return (
    <BootstrapModal centered backdrop="static" onHide={handleOnClose} {...modalProps}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      {children}
      {body && <BootstrapModal.Body>{body}</BootstrapModal.Body>}
      {footer && <BootstrapModal.Footer>{footer}</BootstrapModal.Footer>}
    </BootstrapModal>
  );
};

export type IUseModalProps = ICoreUseModalProps<IModalProps>;

export function useModal(props: IUseModalProps) {
  return useCoreModal<IModalProps>({
    Component: Modal,
    ...props,
  });
}
