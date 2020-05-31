import React, { PropsWithChildren } from 'react';
import { Auth } from '@aws-amplify/auth';
import { UsernameAttributes } from 'aws-amplify-react/lib-esm/Auth/common/types';
import {
  Authenticator,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
} from 'aws-amplify-react';
import { IAuthenticatorProps } from 'aws-amplify-react/lib-esm/Auth/Authenticator';
import { useTranslation } from 'react-i18next';
import {
  IUser as ICoreUser,
  IdentityComponent as CoreIdentityComponent,
  IIdentityContextProviderProps as ICoreIdentityContextProviderProps,
  IdentityContextProvider as CoreIdentityContextProvider,
  IIdentityComponentProps,
} from '@reactionable/core';

export type IUser = ICoreUser;

export {
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  SignUp,
  SignOut,
} from 'aws-amplify-react';

const dataToUser = (data?: {
  id: string;
  username: string;
  attributes: {
    email: string;
  };
}): IUser | null => {
  if (!data) {
    return null;
  }
  return {
    displayName: () => data.attributes.email,
  } as IUser;
};

function IdentityComponent({
  setUser,
  ...props
}: PropsWithChildren<IIdentityComponentProps<IUser> & IAuthenticatorProps>) {
  const { t } = useTranslation();

  const authenticatorProps = Object.assign(
    {
      errorMessage: (message: string) => t(message),
      usernameAttributes: UsernameAttributes.EMAIL,
      signUpConfig: {
        hideAllDefaults: true,
        signUpFields: [
          {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 1,
            type: 'string',
          },
          {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password',
          },
        ],
      },
    },
    props
  );

  return (
    <Authenticator
      {...authenticatorProps}
      onStateChange={(authState: string, data?) => {
        setUser(authState !== 'signedIn' ? null : dataToUser(data));
      }}
      children={[SignIn, ConfirmSignIn, VerifyContact, ForgotPassword]}
    />
  );
}

export type IIdentityContextProviderProps = ICoreIdentityContextProviderProps<IUser> &
  IAuthenticatorProps;

export const useIdentityContextProviderProps = (
  props: Partial<IIdentityContextProviderProps> = {}
): IIdentityContextProviderProps => {
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
};

export const IdentityContextProvider = (
  props?: PropsWithChildren<Partial<IIdentityContextProviderProps>>
) => {
  return <CoreIdentityContextProvider {...useIdentityContextProviderProps()} {...props} />;
};
