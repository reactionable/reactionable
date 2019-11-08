import * as React from 'react';
import { Auth } from 'aws-amplify';
import { UsernameAttributes } from 'aws-amplify-react/lib-esm/Auth/common/types';
// import { CognitoUser } from '@aws-amplify/auth';
import { Authenticator, SignIn, ConfirmSignIn, VerifyContact, ForgotPassword } from 'aws-amplify-react';
import { IAuthenticatorProps } from 'aws-amplify-react/lib-esm/Auth/Authenticator';
import { useTranslation } from 'react-i18next';
import {
    IUser as ICoreUser,
    IdentityComponent as CoreIdentityComponent,
    IIdentityContextProviderProps as ICoreIdentityContextProviderProps,
    IIdentityComponentProps
} from '@reactionable/core';

export type IUser = ICoreUser/* & CognitoUser*/;

const dataToUser = (data?: any): IUser | null => {
    if (!data) {
        return null;
    }
    return {
        displayName: () => data.username,
        // ...data,
    } as IUser;
}

function IdentityComponent({
    setUser,
    ...props
}: React.PropsWithChildren<IIdentityComponentProps<IUser> & IAuthenticatorProps>) {
    const { t } = useTranslation();
    const authenticatorProps = Object.assign({
        usernameAttributes: UsernameAttributes.EMAIL,
        signUpConfig: {
            hideAllDefaults: true,
            signUpFields: [
                {
                    label: t('Email'),
                    key: 'email',
                    required: true,
                    displayOrder: 1,
                    type: 'string'
                },
                {
                    label: t('Password'),
                    key: 'password',
                    required: true,
                    displayOrder: 2,
                    type: 'password'
                },
            ]
        },
    }, props);

    return <Authenticator
        {...authenticatorProps}
        onStateChange={(authState: string, data?) => {
            setUser(authState !== 'signedIn' ? null : dataToUser(data));
        }}
        children={[
            SignIn,
            ConfirmSignIn,
            VerifyContact,
            ForgotPassword,
        ]}
    />;
};

export type IIdentityContextProviderProps = ICoreIdentityContextProviderProps<IUser> & IAuthenticatorProps;

export const useIdentityContextProviderProps = (props: Partial<IIdentityContextProviderProps> = {}): IIdentityContextProviderProps => {
    return {
        identityProvider: 'Amplify',
        logout: async () => await Auth.signOut(),
        getUser: async () => {
            const data = await Auth.currentUserInfo();
            return dataToUser(data);
        },
        Component: IdentityComponent as CoreIdentityComponent<IUser>,
        ...props,
    };
}