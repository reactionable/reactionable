import * as React from 'react';
import { Field, FieldProps, getIn } from 'formik';

export type IFormFieldValue = string;

export type IFormFieldPropsEnhanced<Value extends IFormFieldValue> = FieldProps<Value> & {
    field: {
        isValid: boolean;
        isInvalid: boolean;
        ref: React.RefObject<any>;
    };
};

export type IRenderFormField<Value extends IFormFieldValue> = (
    fieldProps: IFormFieldPropsEnhanced<Value>,
    error?: string,
) => React.ReactElement;

export type IFormFieldProps<Value extends IFormFieldValue> = {
    name: string;
    autoFocus?: boolean;
    render: IRenderFormField<Value>;
};

export function FormField<Value extends IFormFieldValue>({ name, render, autoFocus }: React.PropsWithChildren<IFormFieldProps<Value>>) {
    const inputRef = React.useRef<any>(null);
    React.useEffect(() => {
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
            field: Object.assign(fieldProps.field, {
                isValid,
                isInvalid,
                ref: inputRef,
            }),
        });
        return render(fieldPropsEnhanced, touch ? error : undefined);
    };
    return <Field name={name} render={renderField} />;
}
