import React, { ReactElement, ElementType } from 'react';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import {
    FormField as CoreFormField,
    IFormFieldProps as ICoreFormFieldProps,
    IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
    IFormFieldValue
} from '@reactionable/core';

export type IFormFieldProps<
    FieldElement extends ElementType,
    Value extends IFormFieldValue
    > = Omit<ICoreFormFieldProps<FieldElementProps<FieldElement>, Value>, 'children'> &
    Partial<Pick<ICoreFormFieldProps<FieldElementProps<FieldElement>, Value>, 'children'>>
    & {
        label?: ReactElement;
    };

export type IFormFieldPropsEnhanced<
    FieldElement extends ElementType,
    Value extends IFormFieldValue
    > = ICoreFormFieldPropsEnhanced<FieldElementProps<FieldElement>, Value>;

type FieldElementProps<FieldElement extends ElementType> =
    ReplaceProps<FieldElement, BsPrefixProps<FieldElement> & FormControlProps>;

export function FormField<
    FieldElement extends ElementType = 'input',
    Value extends IFormFieldValue = string
>({ label, children, ...props }: IFormFieldProps<FieldElement, Value>) {

    const renderChildren = (fieldProps: IFormFieldPropsEnhanced<FieldElement, Value>) => {
        let fieldContent: ReactElement;
        if (children) {
            fieldContent = children(fieldProps);
        }
        else {
            fieldContent = <FormControl {...fieldProps.field} />;
            if (fieldProps.field.type === 'hidden') {
                return fieldContent;
            }
        }
        return <FormGroup controlId={fieldProps.field.name}>
            {label && <FormLabel>{label}</FormLabel>}
            {fieldContent}
            {fieldProps.error && <Feedback type="invalid">{fieldProps.error}</Feedback>}
        </FormGroup>;
    };

    return <CoreFormField<
        FieldElementProps<FieldElement>,
        Value
    > {...{
        ...props,
        children: renderChildren,
    } as ICoreFormFieldProps<FieldElementProps<FieldElement>, Value>} />;
}
