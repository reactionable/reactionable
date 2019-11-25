import React, { PropsWithChildren } from 'react';
import { Form as FormikForm } from 'formik';
import {
    Form as CoreForm,
    IFormProps as ICoreFormProps,
    IOnSubmitForm as ICoreOnSubmitForm,
    IFormChildrenProps,
} from '@reactionable/core';

export type IFormProps<Values, Data> = ICoreFormProps<Values, Data>;

export type IOnSubmitForm<Values, Data> = ICoreOnSubmitForm<Values, Data>;

export function Form<Values, Data>({ children, ...props }: PropsWithChildren<IFormProps<Values, Data>>) {

    const renderChildren = (formikProps: IFormChildrenProps<Values>) => {
        return <FormikForm className="needs-validation">
            {children(formikProps)}
        </FormikForm>;
    };

    return <CoreForm<Values, Data>
        {...props}
        children={renderChildren}
    />;
}

