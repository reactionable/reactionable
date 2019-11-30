import React, { ReactElement, ElementType } from 'react';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import FormCheck, { FormCheckProps } from 'react-bootstrap/FormCheck';
import FormGroup from 'react-bootstrap/FormGroup';
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import {
    FormField as CoreFormField,
    IFormFieldProps as ICoreFormFieldProps,
    IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
    IFormFieldValue,
    IRenderFormField,
    IFieldInputPropsEnhanced,
} from '@reactionable/core';

type IFieldElement = 'input' | 'select' | 'textarea' | 'checkbox' | 'radio';

export type IFormFieldProps<
    FieldElement extends IFieldElement,
    Value extends IFormFieldValue
    > = Omit<ICoreFormFieldProps<FieldElementProps<FieldElement>, Value>, 'children'>
    & {
        label?: ReactElement | string;
        children?: IRenderFormField<FieldElementProps<FieldElement>, Value> | ReactElement;
    };

export type IFormFieldPropsEnhanced<
    FieldElement extends IFieldElement = 'input',
    Value extends IFormFieldValue = string
    > = ICoreFormFieldPropsEnhanced<FieldElementProps<FieldElement>, Value>;

type FieldElementProps<FieldElement extends IFieldElement> = FieldElement extends ElementType ? FieldFormElementProps<FieldElement> : FieldCheckElementProps;

type FieldFormElementProps<FieldElement extends ElementType> = ReplaceProps<FieldElement, BsPrefixProps<FieldElement> & FormControlProps>;
type FieldCheckElementProps = ReplaceProps<'input', BsPrefixProps<'input'> & FormCheckProps>;

function isFormCheckProps(props: any): props is FieldFormElementProps<any> {
    return (props as FieldFormElementProps<any>).field.checked !== undefined;
}

export function FormField<
    FieldElement extends IFieldElement = 'input',
    Value extends IFormFieldValue = string
>({ label, children, ...props }: IFormFieldProps<FieldElement, Value>) {

    const renderChildren = (fieldProps: IFormFieldPropsEnhanced<FieldElement, Value>) => {
        let fieldContent: ReactElement = <></>;

        if (fieldProps.error) {
            fieldContent = <Feedback type="invalid">{fieldProps.error}</Feedback>;
        }

        if ('function' === typeof children) {
            fieldContent = <>
                {children(fieldProps as IFormFieldPropsEnhanced<FieldElement, Value>)}
                {fieldContent}
            </>;
        }
        else {
            fieldContent = <>
                {isFormCheckProps(fieldProps)
                    ? <FormCheck
                        {...{
                            ...fieldProps.field,
                            checked: !!fieldProps.field.value
                        } as IFieldInputPropsEnhanced<FieldCheckElementProps, Value>}
                        children={children}
                    />
                    : <FormControl {...fieldProps.field as IFieldInputPropsEnhanced<FieldFormElementProps<any>, Value>} children={children} />
                }
                {fieldContent}
            </>;
            if (fieldProps.field.type === 'hidden') {
                return fieldContent;
            }
        }

        return <FormGroup controlId={fieldProps.field.name}>
            {label && <FormLabel>{label}</FormLabel>}
            {fieldContent}
        </FormGroup>;
    };

    return <CoreFormField<
        FieldElementProps<FieldElement>,
        Value
    > {...{
        ...props,
        children: renderChildren,
    } as ICoreFormFieldProps<FieldElementProps<FieldElement>, Value>} />;
};