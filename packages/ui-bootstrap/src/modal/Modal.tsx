import * as React from 'react';
import BootstrapModal, { ModalProps } from 'react-bootstrap/Modal';
import { useModal as useCoreModal, IModalProps as ICoreModalProps } from '@reactionable/core';

export type IModalProps = ICoreModalProps & ModalProps & {
    body?: React.ReactElement;
    footer?: React.ReactElement;
}

export type ModalComponent = React.FC<IModalProps>;
export const Modal: ModalComponent = ({ title, children, body, footer, ...modalProps }) => {
    return <BootstrapModal
        centered
        show={true}
        backdrop="static"
        dialogClassName="modal-lg"
        {...modalProps}
    >
        <BootstrapModal.Header closeButton>
            <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        {children}
        {body && <BootstrapModal.Body>{body}</BootstrapModal.Body>}
        {footer && <BootstrapModal.Footer>{footer}</BootstrapModal.Footer>}
    </BootstrapModal>;
};

export type IUseModalProps = React.PropsWithChildren<IModalProps>;

export function useModal<P extends IUseModalProps>(props: P) {
    return useCoreModal({
        Component: Modal,
        ...props,
    });
};
