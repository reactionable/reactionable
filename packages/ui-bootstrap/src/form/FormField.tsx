import React, { PropsWithChildren } from 'react';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import {
    FormField as CoreFormField,
    IFormFieldProps as ICoreFormFieldProps,
    IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced, 
    IRenderFormField,
    IFormFieldValue
} from '@reactionable/core';

export type IFormFieldProps<Value extends IFormFieldValue> = Omit<ICoreFormFieldProps<Value>, 'children'> & FormControlProps & {
    label?: string;
    children?: IRenderFormField<Value>;
};

export type IFormFieldPropsEnhanced<Value extends IFormFieldValue> = ICoreFormFieldPropsEnhanced<Value>;

export function FormField<Value extends IFormFieldValue = string>({ label, children, ...props }: PropsWithChildren<IFormFieldProps<Value>>) {
    const renderChildren = (fieldProps: IFormFieldPropsEnhanced<Value>, error?: string) => {
        return <FormGroup controlId={fieldProps.field.name}>
            {label && <FormLabel>{label}</FormLabel>}
            {children
                ? children(fieldProps, error)
                : <FormControl {...fieldProps.field} />
            }
            {error && <Feedback type="invalid">{error}</Feedback>}
        </FormGroup>;
    };
    return <CoreFormField<Value> {...props} children={renderChildren} />;
}
