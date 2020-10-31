import React, { PropsWithChildren, ReactNode, createContext, useContext, useReducer } from 'react';
import isEqual from 'react-fast-compare';
import { ILinkProps, Link } from '../router/Link';

export type INavItemProps<LinkProps extends ILinkProps = ILinkProps> = LinkProps;

export type INavItemsProps<NavItemProps extends INavItemProps> = {
  navItems?: Array<NavItemProps>;
};

export type INavItemsContext<N extends INavItemProps> = INavItemsProps<N> & {
  setNavItems: (navItems: Array<N>) => void;
};

type NavItemType<C extends INavItemsProps<INavItemProps>> = C extends INavItemsProps<infer N>
  ? N extends INavItemProps
    ? N
    : INavItemProps
  : INavItemProps;

export function createNavItemContextProvider<P extends INavItemsProps<INavItemProps>>(
  defaultValue: P
) {
  const NavItemContext = createContext<INavItemsContext<NavItemType<P>>>({
    ...defaultValue,
    setNavItems: (navItems: Array<NavItemType<P>>) => {},
  } as INavItemsContext<NavItemType<P>>);

  const NavItemContextProvider = ({ children, ...props }: PropsWithChildren<P>) => {
    const [navItems, setNavItems] = useReducer<
      (
        prevState: Array<NavItemType<P>> | undefined,
        state: Array<NavItemType<P>> | undefined
      ) => Array<NavItemType<P>> | undefined
    >((prevState, state) => {
      return isEqual(prevState, state) ? prevState : state;
    }, undefined);

    return (
      <NavItemContext.Provider
        value={
          {
            navItems,
            setNavItems,
            ...props,
          } as INavItemsContext<NavItemType<P>>
        }
      >
        {children}
      </NavItemContext.Provider>
    );
  };

  const useNavItemContext = () => {
    return useContext<INavItemsContext<NavItemType<P>>>(NavItemContext);
  };

  return {
    NavItemContextProvider,
    NavItemContextConsumer: NavItemContext.Consumer,
    useNavItemContext,
  };
}

export function navItemToComponent(props: INavItemProps): ReactNode {
  const key = `${props.href}`;

  return <Link key={key} {...(props as ILinkProps)} />;
}
