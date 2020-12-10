import { compile } from "path-to-regexp";
import {
  Children,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useCallback,
} from "react";

import { IRouteMatchParams } from "./Route";

export type IRouterLinkProps = {
  href: string;
  children: ReactElement;
};

export type IRouterLinkComponent<
  RouterLinkProps extends IRouterLinkProps
> = ComponentType<RouterLinkProps>;

export function RouterLink({
  children,
  ...props
}: PropsWithChildren<IRouterLinkProps>): ReactElement {
  const child: ReactElement = Children.only<ReactElement>(children);
  const childRef: { current: Element } | ((el: Element) => void) =
    child && typeof child === "object" && child["ref"];

  const setRef = useCallback(
    (el: Element) => {
      if (childRef) {
        if (typeof childRef === "function") childRef(el);
        else if (typeof childRef === "object") {
          childRef.current = el;
        }
      }
    },
    [childRef]
  );

  const childProps = {
    ref: setRef,
    ...props,
  } as IRouterLinkProps & {
    ref?: (el: Element) => void;
  };

  return cloneElement(child, childProps);
}

const normalizePath = (path: string): string => {
  path = path.trim();
  const separator = "/";
  const normalizedPathParts: string[] = [];
  path.split(separator).forEach((part) => {
    part = part.trim();
    if (!part.length) {
      return;
    }
    if (part === "..") {
      normalizedPathParts.pop();
      return;
    }
    normalizedPathParts.push(part);
  });

  if (!normalizedPathParts.length) {
    return "/";
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

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;
function compilePath(path: string) {
  if (cache[path]) return cache[path];

  const generator = compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}

export function generatePath(pattern: string, ...params: IRouteMatchParams[]): string {
  const parsedParams = params.reduce((previous, current) => {
    return { ...previous, ...current };
  }, {});

  const path = normalizePath(pattern);

  if (path === "/") {
    return path;
  }

  return compilePath(path)(parsedParams, { pretty: true });
}
