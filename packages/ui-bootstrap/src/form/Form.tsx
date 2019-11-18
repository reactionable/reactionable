import React, { PropsWithChildren } from 'react';
import { Form as FormikForm } from 'formik';
import {
    Form as CoreForm,
    IFormProps as ICoreFormProps,
    IFormChildrenProps,
} from '@reactionable/core';

export type IFormProps<Values, Data> = ICoreFormProps<Values, Data>;

export function Form<Values, Data>({ formChildren, ...props }: PropsWithChildren<IFormProps<Values, Data>>) {

    const renderFormChildren = (formikProps: IFormChildrenProps<Values>) => {
        return <FormikForm className="needs-validation">
            {formChildren(formikProps)}
        </FormikForm>;
    };

    return <CoreForm<Values, Data>
        {...props}
        formChildren={renderFormChildren}
    />;
}

