import * as React from 'react';

export type IUser = {
    displayName: () => string;
};

export interface ILoginFormValues {
    username: string,
    password: string,
}

export interface IIdentityContext<User extends IUser> {
    user: User | undefined | null;
    component: React.ReactElement;
    identityProvider?: string;
    logout: () => Promise<void>;
};

export const IdentityContext = React.createContext<IIdentityContext<any>>({
    user: undefined,
    component: <></>,
    logout: async () => { },
    identityProvider: undefined,
});

export type IIdentityComponentProps<User extends IUser> = {
    setUser: (user: User | null) => void;
};
export type IdentityComponent<User extends IUser> = React.FC<IIdentityComponentProps<User>>;

export type IIdentityContextProviderProps<User extends IUser = IUser> = Omit<IIdentityContext<User>, 'component' | 'user'> & {
    Component: IdentityComponent<User>;
};

export function IdentityContextProvider<User extends IUser>({ Component, ...props }: React.PropsWithChildren<IIdentityContextProviderProps<User>>) {
    const [user, setUser] = React.useState<User | null | undefined>(undefined);
    return <IdentityContext.Provider
        value={{
            user,
            ...props,
            component: <Component setUser={setUser} />,
        }}
    >{props.children}</IdentityContext.Provider>;
};

export function useIdentityContext<User extends IUser>() {
    return React.useContext<IIdentityContext<User>>(IdentityContext);
} 
