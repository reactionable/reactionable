import * as React from 'react';

export interface IModalProps {
    title: string;
    show?: boolean;
    onHide?: () => void;
};

export type ModalComponent = React.FC<IModalProps>;

export type IUseModalProps = React.PropsWithChildren<IModalProps> & {
    Component: ModalComponent;
};

export type IUseModalResult = {
    modal: React.ReactElement;
    openModal: () => void;
    closeModal: () => void;
}

export type IUseModal<P extends IUseModalProps> = (props: P) => IUseModalResult;
export function useModal<P extends IUseModalProps>({ Component, onHide, ...props }: P): IUseModalResult {
    const [show, setShow] = React.useState(props.show);

    const openModal = () => { setShow(true); }
    const closeModal = () => { setShow(false); }

    const onHideCallback = () => {
        closeModal();
        if (onHide) {
            onHide();
        }
    }

    return {
        modal: show && <Component {...props} onHide={onHideCallback} />,
        openModal,
        closeModal,
    }
};
