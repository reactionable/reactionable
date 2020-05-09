import React, {
  useContext,
  createContext,
  useReducer,
  PropsWithChildren,
  ReactElement,
} from 'react';
import {
  LinkProps,
  generatePath as routerGeneratePath,
  NavLinkProps,
  Link,
} from 'react-router-dom';
import isEqual from 'react-fast-compare';

export type INavItem = Omit<LinkProps, 'onSelect'>;

export type INavItemsProps<N extends INavItem> = {
  navItems?: Array<N>;
};

export type INavItemsContext<N extends INavItem> = INavItemsProps<N> & {
  setNavItems: (navItems: Array<N>) => void;
};

type NavItemType<C extends INavItemsProps<INavItem>> = C extends INavItemsProps<infer N>
  ? N extends INavItem
    ? N
    : INavItem
  : INavItem;

const normalizePath = (path: string): string => {
  path = path.trim();
  const separator = '/';
  const normalizedPathParts: string[] = [];
  path.split(separator).forEach((part) => {
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

  if (!normalizedPathParts.length) {
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

export function generatePath(
  pattern: string,
  ...params: Array<{ [paramName: string]: string | number | boolean | undefined }>
): string {
  return routerGeneratePath(
    normalizePath(pattern),
    params.reduce((previous, current) => {
      return { ...previous, ...current };
    }, {})
  );
}

export function createNavItemContextProvider<P extends INavItemsProps<INavItem>>(defaultValue: P) {
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

export function navItemToComponent(props: INavItem): ReactElement {
  const key = `${props.to}`;

  return <Link key={key} {...(props as LinkProps<any> & NavLinkProps)} />;
}
