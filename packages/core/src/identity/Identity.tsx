import { useState } from 'react';

export interface User {
    displayName: () => string;
};

export const useIdentityContext = () => {
    const [user, setUser] = useState<User | undefined | null>(undefined);
    return {
        user,
        setUser,
        login: (values: Object): User | null | undefined => { return undefined },
        logout: () => { },
    };
};