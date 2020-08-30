import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type IUser = {
  displayName: () => string;
};
export interface ILoginFormValues {
  username: string;
  password: string;
}
export interface IIdentityContext<User extends IUser> {
  user: User | undefined | null;
  component: ReactElement;
  identityProvider?: string;
  logout: () => Promise<void>;
}

export const IdentityContext = createContext<IIdentityContext<any>>({
  user: undefined,
  component: <></>,
  logout: async () => {},
  identityProvider: undefined,
});

export type IIdentityComponentProps<User extends IUser> = {
  setUser: (user: User | null) => void;
};

export type IdentityComponent<User extends IUser> = FC<IIdentityComponentProps<User>>;

export type IIdentityContextProviderProps<User extends IUser = IUser> = Omit<
  IIdentityContext<User>,
  'component' | 'user'
> & {
  Component: IdentityComponent<User>;
  getUser: () => Promise<User | null>;
};

export function IdentityContextProvider<User extends IUser>({
  Component,
  getUser,
  logout,
  identityProvider,
  ...props
}: PropsWithChildren<IIdentityContextProviderProps<User>>) {
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
        user,
        logout: logoutHandler,
        identityProvider,
        component: <Component setUser={setUser} {...props} />,
      }}
    >
      {props.children}
    </IdentityContext.Provider>
  );
}

export function useIdentityContext<User extends IUser>() {
  return useContext<IIdentityContext<User>>(IdentityContext);
}
