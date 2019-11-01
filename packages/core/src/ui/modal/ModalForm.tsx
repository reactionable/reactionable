import * as React from 'react';
import { FormikActions } from 'formik';
import { IFormProps } from '../../form/Form';
import { useModal, IUseModalProps, IModalProps, IUseModalResult } from './Modal';

export type IModalFormProps<Values, Data> = IModalProps & {
    form: IFormProps<Values, Data>;
    submitButton: string;
};

export type ModalFormComponent<Values = any, Data = any> = React.FC<IModalFormProps<Values, Data>>;

export type IUseModalFormProps<Values, Data> = IUseModalProps & React.PropsWithChildren<IModalFormProps<Values, Data>> & {
    Component: ModalFormComponent;
};

export type IUseModalForm<Values, Data, P extends IUseModalFormProps<Values, Data>> = (props: P) => IUseModalResult;
export function useModalForm<Values, Data, P extends IUseModalFormProps<Values, Data>>(props: P): IUseModalResult {
    const onSubmit = props.form.onSubmit;
    props.form.onSubmit = async (values: Values, actions: FormikActions<Values>): Promise<Data> => {
        const result = await onSubmit(values, actions);
        if (props.onHide) {
            props.onHide();
        }
        return result;
    };
    return useModal(props);
};

