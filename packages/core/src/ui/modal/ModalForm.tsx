import { ComponentType, PropsWithChildren } from 'react';

import { IFormProps } from '../../form/Form';
import { IModalProps, IUseModalResult } from './Modal';

export type IModalFormProps<
  F extends IFormProps<any, any> = IFormProps<any, any>,
  M extends IModalProps = IModalProps
> = PropsWithChildren<M> & {
  form: PropsWithChildren<Omit<F, 'title'>>;
};

export type IModalFormComponentProps<P extends IFormProps<any, any>> = P &
  Pick<IUseModalResult, 'closeModal'>;

export type ModalFormComponent<P extends IFormProps<any, any>> = ComponentType<
  IModalFormComponentProps<P>
>;
