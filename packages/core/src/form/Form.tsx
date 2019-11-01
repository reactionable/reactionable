import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikActions, Formik, FormikProps, Field, FieldProps, getIn } from 'formik';
import { object } from 'yup';
import { useUIContext } from '../ui/UI';

export interface IFormProps<Values, Data> {
    title: string;
    formSchema: object;
    onSubmit: (values: Values, actions: FormikActions<Values>) => Promise<Data>;
    formValues: Values;
    render: (formikBag: FormikProps<Values>, isLoading: boolean) => React.ReactElement;
    successMessage?: string;
    onSuccess?: (result: Data) => void;
};

export type FormComponent<Values, Data> = React.FC<IFormProps<Values, Data>>;
export function Form<Value, Data>(props: React.PropsWithChildren<IFormProps<Value, Data>>) {

    const { t } = useTranslation();
    const formSchema = object().shape(props.formSchema);
    const { title, onSubmit, formValues, onSuccess, successMessage } = props;

    const { useLoader, useSuccessNotification, useErrorAlert } = useUIContext();
    const { isLoading, loader, setLoading } = useLoader({});
    const { errorAlert, setErrorAlert } = useErrorAlert({});
    const { successNotification, setSuccessNotification } = useSuccessNotification({ title });

    const renderForm = (formikBag: FormikProps<Value>) => {
        const form = props.render(formikBag, isLoading);
        return <>
            {form}
            {errorAlert}
            {loader}
            {successNotification}
        </>;
    };

    const onSubmitCallback = (values: Value, actions: FormikActions<Value>) => {
        setLoading(true);
        onSubmit(values, actions).then((data: Data) => {
            setLoading(false);
            if (successMessage) {
                setSuccessNotification(t(successMessage, data));
            }
            if (onSuccess) {
                onSuccess(data);
            }
        }).catch(error => {
            setLoading(false);
            actions.setSubmitting(false);
            setErrorAlert(error);
        });
    };

    return <Formik
        initialValues={formValues}
        onSubmit={onSubmitCallback}
        validationSchema={formSchema}
        render={renderForm} />;
};

export type IFormFieldPropsEnhanced<Values> = FieldProps<Values> & {
    field: {
        isValid: boolean;
        isInvalid: boolean;
        ref: React.RefObject<any>;
    };
};

export type IRenderFormField<Values> = (
    fieldProps: IFormFieldPropsEnhanced<Values>,
    error?: string,
) => React.ReactElement;

export type IFormFieldProps<Values> = {
    name: string;
    autoFocus?: boolean;
    render: IRenderFormField<Values>;
};

export type FormField<Values> = React.FC<IFormFieldProps<Values>>;
export function FormField<Values>({ name, render, autoFocus }: React.PropsWithChildren<IFormFieldProps<Values>>) {

    const inputRef = React.useRef<any>(null);
    React.useEffect(() => {
        if (autoFocus === true && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, autoFocus]);

    const renderField = (fieldProps: FieldProps<Values>) => {
        const touch = getIn(fieldProps.form.touched, fieldProps.field.name);
        const error = getIn(fieldProps.form.errors, fieldProps.field.name);
        const isValid = !!(touch && !error);
        const isInvalid = !!(error);

        const fieldPropsEnhanced: IFormFieldPropsEnhanced<Values> = Object.assign(fieldProps, {
            field: Object.assign(
                fieldProps.field,
                {
                    isValid,
                    isInvalid,
                    ref: inputRef,
                }
            ),
        });

        return render(
            fieldPropsEnhanced,
            touch ? error : undefined
        );
    };

    return <Field
        name={name}
        render={renderField}
    />;
};

