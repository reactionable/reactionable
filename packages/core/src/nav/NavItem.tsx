import React, { useContext, createContext, useReducer, PropsWithChildren } from 'react';
import { LinkProps, useParams, generatePath } from 'react-router-dom';
import { normalize } from 'path';


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

export function useGeneratedPath(pattern: string, params?: { [paramName: string]: string | number | boolean | undefined }): string {
    const matchParams = useParams();
    return generatePath(normalize(pattern), { ...matchParams, ...params });
}

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
            navItems: navItems.map(navItem => {
                if (navItem.to && 'string' === typeof navItem.to) {
                    navItem.to = useGeneratedPath(navItem.to);
                }
                return navItem;
            }),
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
