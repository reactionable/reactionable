import * as React from 'react';
import { Auth } from 'aws-amplify';
// import { CognitoUser } from '@aws-amplify/auth';
import { Authenticator, SignIn, ConfirmSignIn, VerifyContact, ForgotPassword } from 'aws-amplify-react';
import { 
    IUser as ICoreUser, 
    IdentityComponent as CoreIdentityComponent ,
    IIdentityContextProviderProps as ICoreIdentityContextProviderProps
} from '@reactionable/core';

export type IUser = ICoreUser/* & CognitoUser*/;

const IdentityComponent: CoreIdentityComponent<IUser> = ({ setUser }) => {
    return <Authenticator
        onStateChange={(authState: string, data?) => {
            if (!data || authState !== 'signedIn') {
                setUser(null);
                return;
            }
            setUser({
                displayName: () => data.username,
                // ...data,
            } as IUser);
        }}
        children={[
            SignIn,
            ConfirmSignIn,
            VerifyContact,
            ForgotPassword,
        ]} />;
};

export type IIdentityContextProviderProps = ICoreIdentityContextProviderProps<IUser>;

export const useIdentityContextProviderProps = (props: Partial<IIdentityContextProviderProps> = {}): IIdentityContextProviderProps => {
    return {
        identityProvider: 'Amplify',
        logout: async () => await Auth.signOut(),
        Component: IdentityComponent as CoreIdentityComponent<IUser>,
        ...props,
    };
}