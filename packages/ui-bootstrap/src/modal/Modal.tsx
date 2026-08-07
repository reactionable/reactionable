import {
	type IModalProps as ICoreModalProps,
	type IUseModalProps as ICoreUseModalProps,
	type IUseModalResult,
	useModal as useCoreModal,
} from "@reactionable/core";
import type { ComponentType, ReactElement, ReactNode } from "react";
import BootstrapModal, { type ModalProps } from "react-bootstrap/Modal";

export type IModalProps = ICoreModalProps &
	ModalProps & {
		body?: ReactNode;
		footer?: ReactNode;
	};

export type ModalComponent = ComponentType<IModalProps>;
export const Modal = ({
	title,
	children,
	body,
	footer,
	onHide,
	...modalProps
}: IModalProps): ReactElement => {
	const handleOnClose = () => {
		if (onHide) {
			onHide();
		}
	};

	return (
		<BootstrapModal
			centered
			backdrop="static"
			onHide={handleOnClose}
			{...modalProps}
		>
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

export function useModal(props: IUseModalProps): IUseModalResult {
	return useCoreModal<IModalProps>({
		Component: Modal,
		...props,
	});
}
