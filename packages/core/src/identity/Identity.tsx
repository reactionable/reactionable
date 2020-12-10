import { ReactElement, useEffect, useState } from "react";
import { ComponentType, PropsWithChildren } from "react";

import { IProviderProps, createProvider } from "../app/Provider";
import { useTranslation } from "../i18n/I18n";
import { IUseQueryResult } from "../query/Query";
import { QueryWrapper } from "../query/QueryWrapper";
import { useUIContext } from "../ui/UI";

// eslint-disable-next-line @typescript-eslint/ban-types
export type IUser = {};

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
  AuthComponent: AuthComponent<User>;
  auth: ReactElement | null;
  useFetchUser: () => IUseQueryResult<User | null>;
  logout: () => Promise<void>;
  setUser: (user: User | null | undefined) => void;
  displayName: () => string;
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
    useFetchUser: () => ({ data: null, loading: false, refetch: () => null }),
    setUser: (user: User | null | undefined) => {
      // Do nothing
      user;
    },
    displayName: () => "",
    auth: null,
    ...props,
  };
}

const { Context: IdentityContext, useContext } = createProvider<IIdentityProviderProps>(
  useIdentityProviderProps()
);

function IdentityContextProvider<User extends IUser>({
  AuthComponent,
  logout,
  identityProvider,
  useFetchUser,
  ...props
}: PropsWithChildren<IIdentityProviderProps<User>>): ReactElement {
  const [userState, setUserState] = useState<User | null | undefined>();
  const { data: user, loading, error } = useFetchUser();
  const { useErrorNotification } = useUIContext();
  const { t } = useTranslation("identity");
  const { errorNotification, setErrorNotification } = useErrorNotification({
    title: t("Authentication"),
  });

  const setUser = (newUser: User | null | undefined) => {
    setUserState((currentUser) => (currentUser === newUser ? currentUser : newUser));
  };

  useEffect(() => {
    if (loading) {
      setUser(undefined);
      return;
    }

    setUser(user);
  }, [user, loading]);

  const logoutHandler = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      setErrorNotification(error);
    }
  };

  const providerProps: IIdentityProviderProps<User> = {
    ...props,
    useFetchUser,
    user: userState,
    logout: logoutHandler,
    identityProvider,
    AuthComponent,
    setUser,
  };

  const auth = (
    <QueryWrapper loading={loading} data={true} error={error}>
      {() => <AuthComponent {...providerProps} setUser={setUser} />}
    </QueryWrapper>
  );

  return (
    <IdentityContext.Provider
      value={
        {
          ...providerProps,
          auth,
        } as IIdentityProviderProps<IUser>
      }
    >
      {errorNotification}
      {props.children}
    </IdentityContext.Provider>
  );
}

export function useIdentityContext<User extends IUser>(): IIdentityProviderProps<User> {
  return useContext() as IIdentityProviderProps<User>;
}

export { IdentityContext, IdentityContextProvider };
