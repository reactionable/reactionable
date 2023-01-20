import { Auth } from "@aws-amplify/auth";
import { Authenticator, AuthenticatorProps } from "@aws-amplify/ui-react";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  IdentityContextProvider as CoreIdentityContextProvider,
  IIdentityProviderProps as ICoreIdentityProviderProps,
  IIdentityProviderValue as ICoreIdentityProviderValue,
  IUser as ICoreUser,
  useIdentityContext as coreUseIdentityContext,
  useIdentityProviderProps as coreUseIdentityProviderProps,
} from "@reactionable/core/lib/identity/Identity";
import { ComponentType, PropsWithChildren, ReactElement, useEffect, useState } from "react";

export type IUser = ICoreUser & {
  id: string;
  username: string;
  attributes: {
    email: string;
  };
};

const dataToUser = (data?: IUser): IUser | null => {
  if (!data) {
    return null;
  }
  return data;
};

function AuthComponent(props: PropsWithChildren<AuthenticatorProps>) {
  const { t } = useTranslation();
  const { setUser } = useIdentityContext();

  const authenticatorProps = Object.assign({
    errorMessage: (message: string) => t(message),
    ...props,
  });

  return (
    <Authenticator
      {...authenticatorProps}
      onStateChange={(authState: string, data?: IUser) => {
        setUser(authState !== "signedIn" ? null : dataToUser(data));
      }}
    />
  );
}

export type IIdentityProviderProps = ICoreIdentityProviderProps<IUser> &
  Omit<AuthenticatorProps, "children">;
export type IIdentityProviderValue = ICoreIdentityProviderValue<IUser> & AuthenticatorProps;

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
      Auth.currentAuthenticatedUser()
        .then((data) => {
          setUser(dataToUser(data));
        })
        .catch((error) => {
          if (error === "The user is not authenticated") {
            setUser(null);
          } else {
            throw error;
          }
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

export const IdentityContextProvider = (props?: Partial<IIdentityProviderProps>): ReactElement => {
  return <CoreIdentityContextProvider<IUser> {...useIdentityProviderProps(props)} />;
};
