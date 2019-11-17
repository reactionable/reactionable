import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';

export interface IModalProps {
    title: string;
    show?: boolean;
    onHide?: () => void;
};

export type ModalComponent<P extends IModalProps = IModalProps> = FC<P>;

export type IUseModalProps<P extends IModalProps = IModalProps> = PropsWithChildren<P>;

export type IUseModalResult = {
    modal: ReactElement;
    openModal: () => void;
    closeModal: () => void;
};

export type IUseModal<P extends IUseModalProps> = (props: P) => IUseModalResult;

export function useModal<P extends IUseModalProps>({ Component, onHide, ...props }: P & {
    Component: ModalComponent<any>;
}): IUseModalResult {
    const [show, setShow] = useState(props.show);

    const openModal = () => { setShow(true); };
    const closeModal = () => { setShow(false); };

    const onHideCallback = () => {
        closeModal();
        if (onHide) {
            onHide();
        }
    };

    const componentProps = { ...props, onHide: onHideCallback };

    return {
        modal: show && <Component {...componentProps} />,
        openModal,
        closeModal,
    };
};
