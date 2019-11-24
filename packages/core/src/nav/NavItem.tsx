import React, { useContext, createContext, useReducer, PropsWithChildren } from 'react';
import { LinkProps, generatePath as routerGeneratePath } from 'react-router-dom';

export type INavItem = Omit<LinkProps, 'onSelect'>;

export type INavItemsProps<N extends INavItem> = {
    navItems?: Array<N>;
};

export type INavItemsContext<N extends INavItem> = INavItemsProps<N> & {
    setNavItems: (navItems: Array<N>) => void;
};

type NavItemType<C extends INavItemsProps<INavItem>> = C extends INavItemsProps<infer N>
    ? (N extends INavItem ? N : INavItem)
    : INavItem;

const normalizePath = (path: string): string => {
    path = path.trim();
    const separator = '/';
    const normalizedPathParts: string[] = [];
    path.split(separator).forEach(part => {
        part = part.trim();
        if (!part.length) {
            return;
        }
        if (part === '..') {
            normalizedPathParts.pop();
            return;
        }
        normalizedPathParts.push(part);
    });

    if(!normalizedPathParts.length){
        return '/';
    }

    let normalizedPath = normalizedPathParts.join(separator);
    if (path[0] === separator) {
        normalizedPath = separator + normalizedPath;
    }
    if (path[path.length - 1] === separator) {
        normalizedPath += separator;
    }

    return normalizedPath;
};

export function generatePath(pattern: string, ...params: Array<{ [paramName: string]: string | number | boolean | undefined }>): string {
    return routerGeneratePath(normalizePath(pattern), params.reduce((previous, current) => {
        return { ...previous, ...current };
    }, {}));
};

export function createNavItemContextProvider<P extends INavItemsProps<INavItem>>(defaultValue: P) {
    const NavItemContext = createContext<INavItemsContext<NavItemType<P>>>({
        ...defaultValue,
        setNavItems: (navItems: Array<NavItemType<P>>) => { },
    } as INavItemsContext<NavItemType<P>>);

    const NavItemContextProvider = ({ children, ...props }: PropsWithChildren<P>) => {
        const [navItems, setNavItems] = useReducer<(
            prevState: Array<NavItemType<P>>,
            state: Array<NavItemType<P>>
        ) => Array<NavItemType<P>>>((prevState, state) => {
            return state.every((navItem: NavItemType<P>, index: number) => {
                if (!prevState[index]) {
                    return false;
                }
                const { children: navItemChildren, ...navItemProps } = navItem;
                const { children: prevNavItemChildren, ...prevNavItemProps } = navItem;

                if (JSON.stringify(navItemProps) !== JSON.stringify(prevNavItemProps)) {
                    return false;
                }

                if (!navItemChildren || !prevNavItemChildren) {
                    return true;
                }

                if (typeof navItemChildren !== typeof prevNavItemChildren) {
                    return false;
                }

                if (/^[sbn]/.test(typeof navItemChildren)) {
                    return navItemChildren === prevNavItemChildren;
                }

                return true;

            }) ? prevState : state;
        }, []);

        return <NavItemContext.Provider value={{
            navItems,
            setNavItems,
            ...props,
        } as INavItemsContext<NavItemType<P>>}>{children}</NavItemContext.Provider>;
    }

    const useNavItemContext = () => {
        return useContext<INavItemsContext<NavItemType<P>>>(NavItemContext);
    };

    return {
        NavItemContextProvider,
        NavItemContextConsumer: NavItemContext.Consumer,
        useNavItemContext,
    };
}
