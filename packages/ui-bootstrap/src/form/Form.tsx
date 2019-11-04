import * as React from 'react';
import { FormikProps, Form as FormikForm } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import {
    Form as CoreForm,
    IFormProps as ICoreFormProps,
    FormField as CoreFormField,
    IFormFieldProps as ICoreFormFieldProps, 
    IRenderFormField,
    IFormFieldPropsEnhanced,
} from '@reactionable/core';

export type IFormProps<Values, Data> = ICoreFormProps<Values, Data>;

export function Form<Value, Data>({ render, ...props }: React.PropsWithChildren<IFormProps<Value, Data>>) {

    const renderFormFields = (formikProps: FormikProps<Value>, isLoading: boolean) => {
        return <FormikForm className="needs-validation">
            {render(formikProps, isLoading)}
        </FormikForm>;
    };

    return <CoreForm<Value, Data>
        {...props}
        render={renderFormFields}
    />;
}

export type IFormFieldProps<Values> = Omit<ICoreFormFieldProps<Values>, 'render'> & {
    label?: string;
    render?: IRenderFormField<Values>;
};

export function FormField<Values>({ label, render, ...props }: React.PropsWithChildren<IFormFieldProps<Values>>) {

    const renderField = (fieldProps: IFormFieldPropsEnhanced<Values>, error?: string) => {
        return <FormGroup controlId={fieldProps.field.name}>
            {label && <FormLabel>{label}</FormLabel>}
            {
                render ? render(fieldProps, error) : <FormControl
                    {...fieldProps.field}
                />
            }
            {error && <Feedback type="invalid">{error}</Feedback>}
        </FormGroup>;
    }

    return <CoreFormField<Values> {...props} render={renderField} />;
};

