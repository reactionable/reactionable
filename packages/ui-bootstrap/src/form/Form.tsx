import * as React from 'react';
import { useSuccessNotification } from '../notification/Notification';
import { useErrorAlert } from '../alert/ErrorAlert';
import { useLoader } from '../loader/Loader';
import { FormikProps, Form as FormikForm } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import {
    Form as CoreForm,
    IFormProps as ICoreFormProps,
    FormField as CoreFormField,
    IFormFieldProps, IRenderFormField,
    IFormFieldPropsEnhanced,
} from '@reactionable/core';

export interface IFormProps<Values, Data> extends Omit<ICoreFormProps<Values, Data>, 'successNotification' | 'errorAlert' | 'loader'> {
    title: string;
};

type FormComponent<Values = any, Data = any> = React.FC<IFormProps<Values, Data>>;

export const Form: FormComponent = ({ title, render, ...props }) => {

    const renderFormFields = (formikBag: FormikProps<any>, isLoading: boolean) => {
        return <FormikForm className="needs-validation">
            {render(formikBag, isLoading)}
        </FormikForm>;
    };

    return <CoreForm
        {...props}
        render={renderFormFields}
        successNotification={useSuccessNotification(title)}
        errorAlert={useErrorAlert()}
        loader={useLoader()}
    />;
}

type FormField<Values = any> = React.FC<Omit<IFormFieldProps<Values>, 'render'> & {
    label?: string;
    render?: IRenderFormField<Values>;
}>;
export const FormField: FormField = ({ label, render, ...props }) => {

    const renderField = (fieldProps: IFormFieldPropsEnhanced<any>, error?: string) => {
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

    return <CoreFormField {...props} render={renderField} />;
};

