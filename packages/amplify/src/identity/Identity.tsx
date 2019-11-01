import * as React from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { Authenticator, SignIn, ConfirmSignIn, VerifyContact, ForgotPassword } from 'aws-amplify-react';
import { IIdentityContextProviderProps, IUser as ICoreUser, IdentityComponent as CoreIdentityComponent } from '@reactionable/core';

export type IUser = ICoreUser & CognitoUser;

const IdentityComponent: CoreIdentityComponent<IUser> = ({ setUser }) => {
    return <Authenticator
        onStateChange={(authState: string, data?) => {
            if (!data || authState !== 'signedIn') {
                setUser(null);
                return;
            }
            setUser({
                displayName: () => data.username,
                ...data,
            });
        }}
        children={[
            SignIn,
            ConfirmSignIn,
            VerifyContact,
            ForgotPassword,
        ]} />;
};

export const useIdentityContextProviderProps = (props: Partial<IIdentityContextProviderProps<IUser>> = {}): IIdentityContextProviderProps<IUser> => {
    return {
        logout: async () => await Auth.signOut(),
        Component: IdentityComponent,
        ...props,
    };
}