import React, { RefObject, ReactElement, PropsWithChildren, useRef, useEffect, InputHTMLAttributes } from 'react';
import { Field, FieldProps, getIn } from 'formik';

export type IFormFieldValue = string;

export type IFormFieldPropsEnhanced<Value extends IFormFieldValue> = FieldProps<Value> & {
    field: {
        isValid: boolean;
        isInvalid: boolean;
        ref: RefObject<any>;
    };
};

export type IRenderFormField<Value extends IFormFieldValue> = (
    fieldProps: IFormFieldPropsEnhanced<Value>,
    error?: string,
) => ReactElement;

export type IFormFieldProps<Value extends IFormFieldValue, T = Element> = {
    children: IRenderFormField<Value>;
} & InputHTMLAttributes<T>;

export function FormField<Value extends IFormFieldValue = IFormFieldValue>({ children, autoFocus, ...props }: PropsWithChildren<IFormFieldProps<Value>>) {
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

        const fieldPropsEnhanced: IFormFieldPropsEnhanced<Value> = Object.assign(fieldProps, {
            field: Object.assign(fieldProps.field, props, {
                isValid,
                isInvalid,
                ref: inputRef,
            }),
        });
        return children(fieldPropsEnhanced, touch ? error : undefined);
    };

    return <Field {...props} children={renderChildren} />;
}
