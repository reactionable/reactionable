import * as React from 'react';
import { FormikProps, Form as FormikForm } from 'formik';
import {
    Form as CoreForm,
    IFormProps as ICoreFormProps,
} from '@reactionable/core';

export type IFormProps<Values, Data> = ICoreFormProps<Values, Data>;

export function Form<Values, Data>({ render, ...props }: React.PropsWithChildren<IFormProps<Values, Data>>) {

    const renderFormFields = (formikProps: FormikProps<Values>, isLoading: boolean) => {
        return <FormikForm className="needs-validation">
            {render(formikProps, isLoading)}
        </FormikForm>;
    };

    return <CoreForm<Values, Data>
        {...props}
        render={renderFormFields}
    />;
}

