import { Auth } from "@aws-amplify/auth";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  IdentityContextProvider as CoreIdentityContextProvider,
  IIdentityProviderProps as ICoreIdentityProviderProps,
  IIdentityProviderValue as ICoreIdentityProviderValue,
  IUser as ICoreUser,
  useIdentityContext as coreUseIdentityContext,
  useIdentityProviderProps as coreUseIdentityProviderProps,
} from "@reactionable/core/lib/identity/Identity";
import Authenticator, { IAuthenticatorProps } from "aws-amplify-react/lib/Auth/Authenticator";
import { UsernameAttributes } from "aws-amplify-react/lib/Auth/common/types";
import { ComponentType, PropsWithChildren, ReactElement, useEffect, useState } from "react";

export type IUser = ICoreUser & {
  id: string;
  username: string;
  attributes: {
    email: string;
  };
};

export {
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  SignUp,
  SignOut,
} from "aws-amplify-react/lib/Auth";

const dataToUser = (data?: IUser): IUser | null => {
  if (!data) {
    return null;
  }
  return data;
};

function AuthComponent(props: PropsWithChildren<IAuthenticatorProps>) {
  const { t } = useTranslation();
  const { setUser, hide } = useIdentityContext();

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
          ...(props?.signUpConfig?.signUpFields || []),
        ],
        ...(props?.signUpConfig || {}),
      },
    },
    hide
  );

  return (
    <Authenticator
      {...authenticatorProps}
      onStateChange={(authState: string, data?) => {
        setUser(authState !== "signedIn" ? null : dataToUser(data));
      }}
    />
  );
}

export type IIdentityProviderProps = ICoreIdentityProviderProps<IUser> & IAuthenticatorProps;
export type IIdentityProviderValue = ICoreIdentityProviderValue<IUser> & IAuthenticatorProps;

export const useIdentityProviderProps = (
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
    login: async (values) => {
      const result = await Auth.signIn(values);
      const user = dataToUser(result);
      if (user) {
        return user;
      }

      throw new Error("No user retrieved from signIn");
    },
    AuthComponent,
    user,
    ...props,
  };
};

export function useIdentityContext(): IIdentityProviderValue {
  return coreUseIdentityContext();
}

export function withIdentityContext(
  Component: ComponentType,
  identityProviderProps?: Partial<IIdentityProviderProps>
): ReactElement {
  return (
    <IdentityContextProvider {...useIdentityProviderProps(identityProviderProps)}>
      <Component />
    </IdentityContextProvider>
  );
}

export const IdentityContextProvider = (
  props?: PropsWithChildren<Partial<IIdentityProviderProps>>
): ReactElement => {
  return <CoreIdentityContextProvider {...useIdentityProviderProps(props)} />;
};
