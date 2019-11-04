import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import { object } from 'yup';
import { useUIContext } from '../ui/UI';

export interface IFormProps<Values, Data> {
    title: string;
    formSchema: object;
    onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => Promise<Data>;
    formValues: Values;
    render: (props: FormikProps<Values>, isLoading: boolean) => React.ReactElement;
    successMessage?: string;
    onSuccess?: (result: Data) => void;
};

export function Form<Value, Data>(props: React.PropsWithChildren<IFormProps<Value, Data>>) {

    const { t } = useTranslation();
    const formSchema = object().shape(props.formSchema);
    const { render, title, onSubmit, formValues, onSuccess, successMessage } = props;

    const { useLoader, useSuccessNotification, useErrorAlert } = useUIContext();
    const { isLoading, loader, setLoading } = useLoader({});
    const { errorAlert, setErrorAlert } = useErrorAlert({});
    const { successNotification, setSuccessNotification } = useSuccessNotification({ title });

    const renderForm = (formikProps: FormikProps<Value>) => {
        const form = render(formikProps, isLoading);
        return <>
            {form}
            {errorAlert}
            {loader}
            {successNotification}
        </>;
    };

    const onSubmitCallback = (values: Value, formikHelpers: FormikHelpers<Value>) => {
        setLoading(true);
        onSubmit(values, formikHelpers).then((data: Data) => {
            setLoading(false);
            if (successMessage) {
                setSuccessNotification(t(successMessage, data));
            }
            if (onSuccess) {
                onSuccess(data);
            }
        }).catch(error => {
            setLoading(false);
            formikHelpers.setSubmitting(false);
            setErrorAlert(error);
        });
    };

    return <Formik
        initialValues={formValues}
        onSubmit={onSubmitCallback}
        validationSchema={formSchema}
        render={renderForm} />;
};
