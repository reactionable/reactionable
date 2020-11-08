import { compile } from 'path-to-regexp';
import React, { AnchorHTMLAttributes, ComponentType, ReactNode, forwardRef } from 'react';

import { useRouterContext } from './Router';

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return (props as ILinkProps).href !== undefined;
}

export type ILinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick' | 'title'
>;

export type IRouterLinkComponent<LinkProps extends ILinkProps> = ComponentType<LinkProps>;

export function RouterLink<LinkProps extends ILinkProps>(props: LinkProps) {
  return <a {...props} />;
}

export const Link = forwardRef<any, any>((props, ref) => {
  const { RouterLink } = useRouterContext();
  return <RouterLink ref={ref} {...props} />;
});

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

export function generatePath(
  pattern: string,
  ...params: Array<{ [paramName: string]: string | number | boolean | undefined }>
): string {
  const parsedParams = params.reduce((previous, current) => {
    return { ...previous, ...current };
  }, {});

  const path = normalizePath(pattern);

  if (path === '/') {
    return path;
  }

  return compilePath(path)(parsedParams, { pretty: true });
}
