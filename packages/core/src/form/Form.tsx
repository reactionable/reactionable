import React, { ReactElement, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import { object } from 'yup';
import { useUIContext } from '../ui/UI';

export type IOnSubmitForm<Values, Data> = (values: Values, formikHelpers: FormikHelpers<Values>) => Promise<Data>;
export interface IFormProps<Values, Data> {
    title: string;
    formSchema: object;
    onSubmit: IOnSubmitForm<Values, Data>;
    formValues: Values;
    formChildren: (isLoading: boolean) => ReactElement;
    successMessage?: string;
    onSuccess?: (result: Data) => void;
};

export function Form<Values, Data>(props: PropsWithChildren<IFormProps<Values, Data>>) {

    const { t } = useTranslation();
    const formSchema = object().shape(props.formSchema);
    const { formChildren, title, onSubmit, formValues, onSuccess, successMessage } = props;

    const { useLoader, useSuccessNotification, useErrorAlert } = useUIContext();
    const { isLoading, loader, setLoading } = useLoader({});
    const { errorAlert, setErrorAlert } = useErrorAlert({});
    const { successNotification, setSuccessNotification } = useSuccessNotification({ title });

    const renderFormChildren = (formikProps: FormikProps<Values>) => {
        const form = formChildren(isLoading);
        return <>
            {form}
            {errorAlert}
            {loader}
            {successNotification}
        </>;
    };

    const onSubmitCallback = (values: Values, formikHelpers: FormikHelpers<Values>) => {
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
        children={renderFormChildren} />;
};
