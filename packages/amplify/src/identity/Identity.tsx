import { Authenticator, AuthenticatorProps } from "@aws-amplify/ui-react";
import { signIn, signOut, getCurrentUser, AuthUser, fetchAuthSession } from "aws-amplify/auth";
import {
  useTranslation,
  IdentityContextProvider as CoreIdentityContextProvider,
  IIdentityProviderProps as ICoreIdentityProviderProps,
  IIdentityProviderValue as ICoreIdentityProviderValue,
  IUser as ICoreUser,
  useIdentityContext as coreUseIdentityContext,
  useIdentityProviderProps as coreUseIdentityProviderProps,
} from "@reactionable/core";
import { ComponentType, PropsWithChildren, ReactElement, useEffect, useState } from "react";

export type IUser = ICoreUser & {
  id: string;
  username: string;
};

const dataToUser = (data?: AuthUser): IUser | null => {
  if (!data) {
    return null;
  }
  return {
    id: data.userId,
    username: data.username,
  };
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
      onStateChange={(authState: string, data?: AuthUser) => {
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
      fetchAuthSession()
        .then((data) => {
          if (!data.identityId) {
            return;
          }
          getCurrentUser()
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
    logout: async () => await signOut(),
    login: async (values) => {
      const result = await signIn(values);

      if (result.isSignedIn) {
        const user = dataToUser(await getCurrentUser());
        if (user) {
          return user;
        }
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
