import React, { RefObject, ReactElement, PropsWithChildren, useRef, useEffect, InputHTMLAttributes } from 'react';
import { Field, FieldProps, getIn } from 'formik';

export type IFormFieldValue = string|boolean;

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
    render: IRenderFormField<Value>;
} & InputHTMLAttributes<T>;

export function FormField<Value extends IFormFieldValue>({ render, autoFocus, ...props }: PropsWithChildren<IFormFieldProps<Value>>) {
    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (autoFocus === true && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, autoFocus]);


    const renderField = (fieldProps: FieldProps<Value>) => {
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
        return render(fieldPropsEnhanced, touch ? error : undefined);
    };

    return <Field {...props} render={renderField} />;
}
