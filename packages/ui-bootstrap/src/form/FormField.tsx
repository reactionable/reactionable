import React, { PropsWithChildren } from 'react';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import {
    FormField as CoreFormField,
    IFormFieldProps as ICoreFormFieldProps,
    IFormFieldPropsEnhanced, IRenderFormField,
    IFormFieldValue
} from '@reactionable/core';

export type IFormFieldProps<Value extends IFormFieldValue> = Omit<ICoreFormFieldProps<Value>, 'render'> & {
    label?: string;
    render?: IRenderFormField<Value>;
};

export function FormField<Value extends string>({ label, render, ...props }: PropsWithChildren<IFormFieldProps<Value>>) {
    const renderField = (fieldProps: IFormFieldPropsEnhanced<Value>, error?: string) => {
        return <FormGroup controlId={fieldProps.field.name}>
            {label && <FormLabel>{label}</FormLabel>}
            {render ? render(fieldProps, error) : <FormControl {...fieldProps.field} />}
            {error && <Feedback type="invalid">{error}</Feedback>}
        </FormGroup>;
    };
    return <CoreFormField<Value> {...props} render={renderField} />;
}
