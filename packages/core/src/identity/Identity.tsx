import * as React from 'react';

export type IUser = {
    displayName: () => string;
};

export interface ILoginFormValues {
    username: string,
    password: string,
}

export interface IIdentityContext<User extends IUser> {
    identityProvider?:string;
    user: User | undefined | null;
    logout: () => Promise<void>;
    component: React.ReactElement;
};

export const IdentityContext = React.createContext<IIdentityContext<any>>({
    identityProvider: undefined,
    user: undefined,
    logout: async () => { },
    component: <></>,
});


export type IIdentityComponentProps<User extends IUser> = {
    setUser: (user: User | null) => void;
};
export type IdentityComponent<User extends IUser> = React.FC<IIdentityComponentProps<User>>;

export type IIdentityContextProviderProps<User extends IUser = IUser> = Pick<IIdentityContext<User>, 'logout'> & {
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
