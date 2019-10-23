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
    logout: () => Promise<void>,
};

export const IdentityContext = React.createContext<IIdentityContext>({
    user: undefined,
    logout: async () => { },
});

export type IIdentityContextProviderProps = Pick<IIdentityContext, 'logout'> & {
    Component: React.FC<{
        setUser: (user: IUser | null) => void;
    }>;
};

export const IdentityContextProvider: React.FC<IIdentityContextProviderProps> = ({ Component, ...props }) => {

    const [user, setUser] = React.useState<IUser | null | undefined>(undefined);
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
