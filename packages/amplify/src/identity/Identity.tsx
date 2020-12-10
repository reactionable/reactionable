import { Auth } from "@aws-amplify/auth";
import {
  IdentityContextProvider as CoreIdentityContextProvider,
  IAuthComponentProps,
  IIdentityProviderProps as ICoreIdentityProviderProps,
  IUser as ICoreUser,
  useIdentityProviderProps as coreUseIdentityProviderProps,
  useTranslation,
} from "@reactionable/core";
import Authenticator, { IAuthenticatorProps } from "aws-amplify-react/lib/Auth/Authenticator";
import { UsernameAttributes } from "aws-amplify-react/lib/Auth/common/types";
import { ConfirmSignIn } from "aws-amplify-react/lib/Auth/ConfirmSignIn";
import ForgotPassword from "aws-amplify-react/lib/Auth/ForgotPassword";
import SignIn from "aws-amplify-react/lib/Auth/SignIn";
import VerifyContact from "aws-amplify-react/lib/Auth/VerifyContact";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";

export type IUser = ICoreUser;

export {
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  SignUp,
  SignOut,
} from "aws-amplify-react/lib/Auth";

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
  const user = props.user;
  const [userState, setUser] = useState<IUser | undefined | null>();
  useEffect(() => {
    if (user && user !== userState) {
      setUser(user);
      return;
    }

    if (userState === undefined) {
      Auth.currentUserInfo().then((data) => {
        setUser(dataToUser(data));
      });
      return;
    }
  }, [user, userState]);
  return {
    ...coreUseIdentityProviderProps(),
    identityProvider: "Amplify",
    logout: async () => await Auth.signOut(),
    AuthComponent,
    user,
    ...props,
  };
};

export const IdentityContextProvider = (
  props?: PropsWithChildren<Partial<IIdentityProviderProps>>
): ReactElement => {
  return <CoreIdentityContextProvider {...useIdentityContextProviderProps()} {...props} />;
};
