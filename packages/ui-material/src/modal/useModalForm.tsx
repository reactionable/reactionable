import { IUseModalResult } from '@reactionable/core/lib/ui/modal/Modal';
import {
  IUseModalFormProps as ICoreUseModalFormProps,
  useModalForm as useCoreModalForm,
} from '@reactionable/core/lib/ui/modal/useModalForm';

import { IModalFormProps, ModalForm } from './ModalForm';

export type IUseModalFormProps<
  MFP extends IModalFormProps = IModalFormProps
> = ICoreUseModalFormProps<MFP>;

export type IUseModalForm<P extends IUseModalFormProps> = (props: P) => IUseModalResult;

export function useModalForm<P extends IUseModalFormProps = IUseModalFormProps>(props: P) {
  return useCoreModalForm<P>({
    ...props,
    FormComponent: ModalForm,
  });
}
