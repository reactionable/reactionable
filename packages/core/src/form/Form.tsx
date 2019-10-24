import * as React from 'react';
import { FormikActions, Formik, FormikProps, Field, FieldProps, getIn } from 'formik';
import { object } from 'yup';
import { IUseErrorAlert, IError } from '../alert/ErrorAlert';
import { IUseLoader } from '../loader/Loader';
import { IUseNotification } from '../notification/Notification';
import { useTranslation } from 'react-i18next';

export interface IFormProps<Values, Data> {
    formSchema: object;
    onSubmit: (values: Values, actions: FormikActions<Values>) => Promise<Data>;
    formValues: Values;
    render: (formikBag: FormikProps<Values>, isLoading: boolean) => React.ReactElement;
    successNotification: IUseNotification;
    successMessage?: string;
    onSuccess?: (result: Data) => void;
    errorAlert: IUseErrorAlert;
    loader: IUseLoader;
};

type FormComponent<Values = any, Data = any> = React.FC<IFormProps<Values, Data>>;

export const Form: FormComponent = (props) => {

    const { t } = useTranslation();
    const formSchema = object().shape(props.formSchema);
    const { onSubmit, formValues, onSuccess, successMessage } = props;

    const {
        notification: successNotification,
        setNotification: setSuccessNotification,
    } = props.successNotification;
    const { errorAlert, setError } = props.errorAlert;
    const { loader, setLoading, isLoading } = props.loader;

    const renderForm = (formikBag: FormikProps<any>) => {
        const form = props.render(formikBag, isLoading);
        return <>
            {form}
            {errorAlert}
            {loader}
            {successNotification}
        </>;
    };

    const onSubmitCallback = (values: any, actions: FormikActions<any>) => {
        setLoading(true);
        onSubmit(values, actions).then((data: any) => {
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
            setError(error);
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
    error?: IError,
) => React.ReactElement;

export type IFormFieldProps<Values = any> = {
    name: string;
    autoFocus?: boolean;
    render: IRenderFormField<Values>;
};

type FormField<Values = any> = React.FC<IFormFieldProps<Values>>;

export const FormField: FormField = ({ name, render, autoFocus }) => {

    const inputRef = React.useRef<any>(null);
    React.useEffect(() => {
        if (autoFocus === true && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, autoFocus]);

    const renderField = (fieldProps: FieldProps<any>) => {
        const touch = getIn(fieldProps.form.touched, fieldProps.field.name);
        const error = getIn(fieldProps.form.errors, fieldProps.field.name);
        const isValid = !!(touch && !error);
        const isInvalid = !!(error);
        return render(
            Object.assign(fieldProps, {
                field: {
                    isValid,
                    isInvalid,
                    ref: inputRef,
                }
            }),
            touch ? error : undefined
        );
    };

    return <Field
        name={name}
        render={renderField}
    />;
};

