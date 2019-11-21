import React, { PropsWithChildren, ReactElement } from 'react';
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
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';

export type IFormFieldProps<FieldElement extends React.ElementType, Value extends IFormFieldValue> = Omit<ICoreFormFieldProps<FieldElement, Value>, 'children'> & FormControlProps & {
    label?: string;
    children?: IRenderFormField<FieldElement, Value> | ReactElement;
};

export type IFormFieldPropsEnhanced<FieldElement extends React.ElementType, Value extends IFormFieldValue> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

type IFormControlProps<FieldElement extends React.ElementType> = ReplaceProps<FieldElement, BsPrefixProps<FieldElement> & FormControlProps>;

export function FormField<FieldElement extends React.ElementType = 'input', Value extends IFormFieldValue = string>({ label, children, ...props }: PropsWithChildren<IFormFieldProps<FieldElement,Value>>) {
    const renderChildren = (fieldProps: IFormFieldPropsEnhanced<FieldElement, Value>, error?: string) => {
        return <FormGroup controlId={fieldProps.field.name}>
            {label && <FormLabel>{label}</FormLabel>}
            {children && 'function' === typeof children
                ? children(fieldProps, error)
                : <FormControl {...fieldProps.field as IFormControlProps<FieldElement>} children={children} />
            }
            {error && <Feedback type="invalid">{error}</Feedback>}
        </FormGroup>;
    };
    return <CoreFormField<FieldElement, Value> {...props} children={renderChildren} />;
}
