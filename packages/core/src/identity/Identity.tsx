import React, { createContext, useContext, useState } from 'react';

export interface User {
    displayName: () => string;
};

export interface IIdentityContext {
    user: User | undefined | null,
    setUser: (user: User | undefined | null) => void,
    login: (values: Object) => User | null | undefined,
    logout: () => void,
}

export const IdentityContext = createContext<IIdentityContext>({
    user: undefined,
    setUser: (user: User | null | undefined) => { },
    login: (values: Object): User | null | undefined => { return undefined },
    logout: () => { },
});

export interface IIdentityContextProviderProps {
    logout: () => void;
    login: (values: Object) => User | null | undefined;
}
export const IdentityContextProvider = (props: IIdentityContextProviderProps) => {

    const [user, setUser] = useState<User | null | undefined>();

    const logout = () => {
        props.logout();
        setUser(undefined);
    }

    const login = (values: Object) => {
        const user = props.login(values);
        setUser(user);
        return user;
    }

    return (
        <IdentityContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
            {...props}
        />
    )
};

export const useIdentityContext = () => useContext(IdentityContext);
