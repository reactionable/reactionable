import React, { ReactElement, useEffect, useState } from "react";
import { ComponentType, PropsWithChildren } from "react";

import { IProviderProps, createProvider } from "../app/Provider";

export type IUser = {
  displayName: () => string;
};
export interface ILoginFormValues {
  username: string;
  password: string;
}
export type IAuthComponentProps<User extends IUser> = IIdentityProviderProps<User> & {
  setUser: (user: User | null) => void;
};

export type AuthComponent<User extends IUser> = ComponentType<IAuthComponentProps<User>>;

export type IIdentityProviderProps<User extends IUser = IUser> = IProviderProps<{
  user: User | undefined | null;
  identityProvider?: string;
  logout: () => Promise<void>;
  AuthComponent: AuthComponent<User>;
  getUser: () => Promise<User | null>;
  auth: ReactElement | null;
}>;

export function NullAuthComponent(): null {
  return null;
}

export function useIdentityProviderProps<User extends IUser = IUser>(
  props?: Partial<IIdentityProviderProps<User>>
): IIdentityProviderProps<User> {
  return {
    user: undefined,
    logout: async () => {
      // Do nothing
    },
    identityProvider: undefined,
    AuthComponent: NullAuthComponent,
    getUser: async (): Promise<User | null> => {
      // Do nothing
      return null;
    },
    auth: null,
    ...props,
  };
}

const { Context: IdentityContext, useContext } = createProvider<IIdentityProviderProps>(
  useIdentityProviderProps()
);

function IdentityContextProvider<User extends IUser>({
  AuthComponent,
  getUser,
  logout,
  identityProvider,
  ...props
}: PropsWithChildren<IIdentityProviderProps<User>>): ReactElement {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (user === undefined) {
      getUser().then((fetchedUser) => {
        if (user !== fetchedUser) {
          setUser(fetchedUser);
        }
      });
    }
  }, [user]);

  const logoutHandler = async () => {
    await logout();
    setUser(null);
  };

  const ProviderProps = {
    ...props,
    user,
    logout: logoutHandler,
    identityProvider,
    getUser,
    AuthComponent,
  };
  const auth = <AuthComponent setUser={setUser} {...ProviderProps} />;

  return (
    <IdentityContext.Provider
      value={
        {
          ...ProviderProps,
          AuthComponent,
          auth,
        } as IIdentityProviderProps<IUser>
      }
    >
      {props.children}
    </IdentityContext.Provider>
  );
}

export function useIdentityContext<User extends IUser>(): IIdentityProviderProps<User> {
  return useContext() as IIdentityProviderProps<User>;
}

export { IdentityContext, IdentityContextProvider };
