import { Auth } from "@aws-amplify/auth";
import {
  IdentityContextProvider as CoreIdentityContextProvider,
  IAuthComponentProps,
  IIdentityProviderProps as ICoreIdentityProviderProps,
  IUser as ICoreUser,
  useTranslation,
  useIdentityProviderProps as coreUseIdentityProviderProps,
} from "@reactionable/core";
import {
  Authenticator,
  ConfirmSignIn,
  ForgotPassword,
  SignIn,
  VerifyContact,
} from "aws-amplify-react";
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";
import { UsernameAttributes } from "aws-amplify-react/lib-esm/Auth/common/types";
import React, { PropsWithChildren, ReactElement } from "react";

export type IUser = ICoreUser;

export {
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  SignUp,
  SignOut,
} from "aws-amplify-react";

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
    displayName: () => data?.attributes?.email || "",
  } as IUser;
};

function AuthComponent({
  setUser,
  ...props
}: PropsWithChildren<IAuthComponentProps<IUser> & IAuthenticatorProps>) {
  const { t } = useTranslation();

  const authenticatorProps = Object.assign(
    {
      errorMessage: (message: string) => t(message),
      usernameAttributes: UsernameAttributes.EMAIL,
      signUpConfig: {
        hideAllDefaults: true,
        signUpFields: [
          {
            label: "Email",
            key: "email",
            required: true,
            displayOrder: 1,
            type: "string",
          },
          {
            label: "Password",
            key: "password",
            required: true,
            displayOrder: 2,
            type: "password",
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
        setUser(authState !== "signedIn" ? null : dataToUser(data));
      }}
    >
      {[SignIn, ConfirmSignIn, VerifyContact, ForgotPassword]}
    </Authenticator>
  );
}

export type IIdentityProviderProps = ICoreIdentityProviderProps<IUser> & IAuthenticatorProps;

export const useIdentityContextProviderProps = (
  props: Partial<IIdentityProviderProps> = {}
): IIdentityProviderProps => {
  return {
    ...coreUseIdentityProviderProps(),
    identityProvider: "Amplify",
    logout: async () => await Auth.signOut(),
    AuthComponent,
    getUser: async () => {
      const data = await Auth.currentUserInfo();
      return dataToUser(data);
    },
    ...props,
  };
};

export const IdentityContextProvider = (
  props?: PropsWithChildren<Partial<IIdentityProviderProps>>
): ReactElement => {
  return <CoreIdentityContextProvider {...useIdentityContextProviderProps()} {...props} />;
};
