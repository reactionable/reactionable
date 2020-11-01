import React, { ReactElement, useEffect, useState } from 'react';
import { ComponentType, PropsWithChildren } from 'react';

import { IProviderProps, createProvider } from '../app/Provider';

export type IUser = {
  displayName: () => string;
};
export interface ILoginFormValues {
  username: string;
  password: string;
}
export type IAuthComponentProps<User extends IUser> = {
  setUser: (user: User | null) => void;
};

export type IdentityComponent<User extends IUser> = ComponentType<IAuthComponentProps<User>>;

export function IdentityComponent<User extends IUser>({
  AuthComponent,
  getUser,
  logout,
  identityProvider,
  ...props
}: PropsWithChildren<IIdentityProviderProps<User>>) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (user === undefined) {
      getUser().then((user) => setUser(user));
    }
  }, [user]);

  const logoutHandler = async () => {
    await logout();
    setUser(null);
  };

  return (
    <IdentityContext.Provider
      value={{
        ...props,
        user,
        logout: logoutHandler,
        identityProvider,
        auth: <AuthComponent setUser={setUser} {...props} />,
        getUser,
        AuthComponent: AuthComponent as IdentityComponent<IUser>,
      }}
    >
      {props.children}
    </IdentityContext.Provider>
  );
}

export type IIdentityProviderProps<User extends IUser = IUser> = IProviderProps<{
  user: User | undefined | null;
  identityProvider?: string;
  logout: () => Promise<void>;
  AuthComponent: IdentityComponent<User>;
  getUser: () => Promise<User | null>;
  auth: ReactElement;
}>;

export function useIdentityProviderProps(): IIdentityProviderProps {
  return {
    user: undefined,
    logout: async () => {
      throw new Error(
        '@reactionable/core does not provide logout function, please install a "@reactionable/identity-*" package'
      );
    },
    identityProvider: undefined,
    AuthComponent: (props: PropsWithChildren<IAuthComponentProps<IUser>>) => <></>,
    getUser: async () => {
      throw new Error(
        '@reactionable/core does not provide getUser function, please install a "@reactionable/identity-*" package'
      );
    },
    auth: <></>,
  };
}

export const {
  Context: IdentityContext,
  ContextProvider: IdentityContextProvider,
  useContext: useIdentityContext,
} = createProvider<IIdentityProviderProps>(useIdentityProviderProps());
