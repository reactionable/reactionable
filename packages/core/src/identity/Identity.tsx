import * as React from 'react';

export interface IUser {
    displayName: () => string;
    [key: string]: any;
};

export interface ILoginFormValues {
    username: string,
    password: string,
}

export interface IIdentityContext {
    user: IUser | undefined | null,
    login: (values: ILoginFormValues) => Promise<IUser | null | undefined>,
    logout: () => Promise<void>,
};

export const IdentityContext = React.createContext<IIdentityContext>({
    user: undefined,
    login: async (values: Object) => { return undefined },
    logout: async () => { },
});

export type IIdentityContextProviderProps = Pick<IIdentityContext, 'login' | 'logout'> & {
    init: () => Promise<IUser | null>;
    Component: React.FC<{
        setUser: (user: IUser | null) => void;
    }>;
};

export const IdentityContextProvider: React.FC<IIdentityContextProviderProps> = ({ init, Component, ...props }) => {

    const [user, setUser] = React.useState<IUser | null | undefined>(undefined);

    init().then(user => { }).catch(error => { throw error });

    return <IdentityContext.Provider
        value={{
            user,
            ...props
        }}
    >
        <Component setUser={setUser} />
        {props.children}
    </IdentityContext.Provider>;
};

export const useIdentityContext = () => React.useContext(IdentityContext);
