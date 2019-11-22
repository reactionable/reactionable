import React, { RefObject, ReactElement, HTMLProps, useRef, useEffect } from 'react';
import { Field, FieldProps, getIn } from 'formik';

export type IFormFieldValue = string;


export type IFormFieldPropsEnhanced<
    FieldElement extends {},
    Value extends IFormFieldValue
    > = FieldProps<Value> & {
        isValid: boolean;
        isInvalid: boolean;
        ref: RefObject<any>;
        error?: string;
        field: FieldElement;
    };

export type IRenderFormField<FieldElement extends HTMLProps<HTMLInputElement>, Value extends IFormFieldValue> = (
    fieldProps: IFormFieldPropsEnhanced<FieldElement, Value>,
) => ReactElement;

export type IFormFieldProps<FieldElement extends HTMLProps<HTMLInputElement>, Value extends IFormFieldValue> = FieldElement & {
    children: IRenderFormField<FieldElement, Value>;
};

export function FormField<
    FieldElement extends HTMLProps<HTMLInputElement> = HTMLProps<HTMLInputElement>,
    Value extends IFormFieldValue = IFormFieldValue
>({ children, autoFocus, ...props }: IFormFieldProps<FieldElement, Value>) {
    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (autoFocus === true && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, autoFocus]);

    const renderChildren = (fieldProps: FieldProps<Value>) => {
        const touch = getIn(fieldProps.form.touched, fieldProps.field.name);
        const error = getIn(fieldProps.form.errors, fieldProps.field.name);
        const isValid = !!(touch && !error);
        const isInvalid = !!(error);

        const fieldPropsEnhanced: IFormFieldPropsEnhanced<FieldElement, Value> = Object.assign(
            fieldProps,
            {
                error: touch ? error : undefined,
                isValid,
                isInvalid,
                ref: inputRef,
                field: Object.assign(fieldProps.field, props) as unknown as FieldElement,
            }
        );
        return children(fieldPropsEnhanced);
    };

    return <Field {...props} children={renderChildren} />;
}
