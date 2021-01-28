import { ReactElement, useCallback, useEffect, useState } from "react";
import { ComponentType, PropsWithChildren } from "react";

import { IProviderProps, createProvider } from "../app/Provider";
import { useTranslation } from "../i18n/I18n";
import { IUseQueryResult } from "../query/Query";
import { useUIContext } from "../ui/UI";
import { Auth } from "./Auth";

// eslint-disable-next-line @typescript-eslint/ban-types
export type IUser = {};

export interface ILoginFormValues {
  username: string;
  password: string;
}

export type IIdentityProviderProps<User extends IUser = IUser> = IProviderProps<{
  user: User | undefined | null;
  identityProvider?: string;
  AuthComponent: ComponentType;
  useFetchUser: () => IUseQueryResult<User | null>;
  login: (values: ILoginFormValues) => Promise<User | null>;
  logout: () => Promise<void>;
  displayName: (user: User) => string;
}>;

export type IIdentityProviderValue<User extends IUser = IUser> = Omit<
  IIdentityProviderProps<User>,
  "displayName"
> & {
  displayName: () => string | null;
  setUser: (user: User | null) => void;
};

export function useIdentityProviderProps<User extends IUser = IUser>(
  props?: Partial<IIdentityProviderProps<User>>
): IIdentityProviderProps<User> {
  return {
    user: undefined,
    login: async () => {
      throw new Error("User does not exist");
    },
    logout: async () => undefined,
    identityProvider: undefined,
    AuthComponent: Auth,
    useFetchUser: () => ({ data: null, loading: false, refetch: () => null }),
    displayName: (user: User) => user["username"] ?? "",
    ...props,
  };
}

const { Context: IdentityContext, useContext } = createProvider<IIdentityProviderValue>({
  ...useIdentityProviderProps(),
  displayName: () => "",
  setUser: () => null,
});

function IdentityContextProvider<User extends IUser>({
  AuthComponent,
  logout,
  identityProvider,
  useFetchUser,
  displayName,
  login,
  ...props
}: PropsWithChildren<IIdentityProviderProps<User>>): ReactElement {
  const [userState, setUserState] = useState<User | null | undefined>();
  const { useErrorNotification, useErrorAlert, useLoader } = useUIContext();
  const { t } = useTranslation("identity");
  const { errorNotification, setErrorNotification } = useErrorNotification({
    title: t("Authentication"),
  });
  const { errorAlert, setErrorAlert } = useErrorAlert();
  const { loader, setLoading } = useLoader();
  const { data: user, loading, error } = useFetchUser();

  const setUser = useCallback((newUser: User | null | undefined) => {
    setUserState((currentUser) => (currentUser === newUser ? currentUser : newUser));
  }, []);

  useEffect(() => {
    setLoading(loading);

    if (loading) {
      setUser(undefined);
      return;
    }

    const userHasLoggedIn = user === null && userState;
    const userHasLoggedOut = user && userState === null;

    // If state is due to login or logout, do not update user
    if (userHasLoggedIn || userHasLoggedOut) {
      return;
    }

    setUser(user);
  }, [user, userState, loading]);

  useEffect(() => {
    setErrorAlert(error);
  }, [error]);

  const loginHandler = useCallback(
    async (values: ILoginFormValues) => {
      const user = await login(values);
      setUser(user);
      return user;
    },
    [login]
  );

  const logoutHandler = useCallback(async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      setErrorNotification(error);
    }
  }, [logout]);

  const displayNameHandler = useCallback(() => {
    return userState ? displayName(userState) : null;
  }, [userState, displayName]);

  const providerValues: IIdentityProviderValue<User> = {
    ...props,
    displayName: displayNameHandler,
    useFetchUser,
    user: userState,
    login: loginHandler,
    logout: logoutHandler,
    identityProvider,
    AuthComponent,
    setUser,
  };

  return (
    <IdentityContext.Provider value={providerValues as IIdentityProviderValue<IUser>}>
      {loader}
      {errorNotification}
      {errorAlert}
      {props.children}
    </IdentityContext.Provider>
  );
}

export function useIdentityContext<User extends IUser>(): IIdentityProviderValue<User> {
  return useContext() as IIdentityProviderValue<User>;
}

export function withIdentityContext<User extends IUser>(
  Component: ComponentType,
  identityProviderProps?: Partial<IIdentityProviderProps<User>>
): ReactElement {
  return (
    <IdentityContextProvider {...useIdentityProviderProps(identityProviderProps)}>
      <Component />
    </IdentityContextProvider>
  );
}

export { IdentityContext, IdentityContextProvider };
