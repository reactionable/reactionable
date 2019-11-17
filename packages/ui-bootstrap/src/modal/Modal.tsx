import React, { ReactElement, FC, PropsWithChildren } from 'react';
import BootstrapModal, { ModalProps } from 'react-bootstrap/Modal';
import { useModal as useCoreModal, IModalProps as ICoreModalProps } from '@reactionable/core';

export type IModalProps = ICoreModalProps & ModalProps & {
    body?: ReactElement;
    footer?: ReactElement;
};

export type ModalComponent = FC<IModalProps>;
export const Modal: ModalComponent = ({ title, children, body, footer, ...modalProps }) => {
    return <BootstrapModal
        centered
        show={true}
        backdrop="static"
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

export type IUseModalProps = PropsWithChildren<IModalProps>;

export function useModal(props: IUseModalProps) {
    return useCoreModal<IUseModalProps>({
        Component: Modal,
        ...props,
    });
};
