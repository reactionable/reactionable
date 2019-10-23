import * as React from 'react';
import { FormikProps, FormikActions } from 'formik';
import { useTranslation } from 'react-i18next';
import { string } from 'yup';
import { useIdentityContext } from '@reactionable/core';
import { useModalForm } from '../../../modal-form/ModalForm';
import { FormField } from '../../../form/Form';

interface IFormValues {
    email: string;
    password: string;
    remember: boolean;
};

export const useAuthenticator = () => {
    const { t } = useTranslation();
    const { login, logout, setUser, user } = useIdentityContext();
    const {
        modal
    } = useModalForm({
        title: t('Sign Up / Sign In'),
        submitButton: t('Sign In'),
        formValues: { email: '', password: '', remember: true },
        onSubmit: async (values: IFormValues, actions: FormikActions<IFormValues>) => {
            const user = await login(values);
            setUser(user);
            return user;
        },
        formSchema: {
            email: string()
                .email()
                .required(t('Email is required')),
            password: string()
                .required(t('Password is required')),
        },
        render: (formikBag: FormikProps<IFormValues>, isLoading: boolean) => <>
            <FormField
                name="email"
                label={t('Email')}
            />
            <FormField
                name="email"
                // type="password"
                label={t('Email')}
            />
        </>,
    });

    return {
        open,
        close,
        modal,
        user,
        logout,
    };
};