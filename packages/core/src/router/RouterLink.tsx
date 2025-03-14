import { PathFunction, compile } from "path-to-regexp";
import { ComponentType, ForwardedRef, ReactElement, forwardRef } from "react";

import { IRouteMatchParams } from "./Route";

export type IRouterLinkProps<Props extends Record<string, unknown> = Record<string, unknown>> =
  Partial<Props> & {
    href?: string;
    Component: ComponentType<Partial<Props>>;
  };

export type IRouterLinkComponent<RouterLinkProps extends IRouterLinkProps> =
  ComponentType<RouterLinkProps>;

export type ILinkAnchorProps<RouterLinkProps extends IRouterLinkProps> = Omit<
  RouterLinkProps,
  "Component"
>;

export const RouterLink = forwardRef(function RouterLink<RouterLinkProps extends IRouterLinkProps>(
  { Component, ...props }: RouterLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  return <Component {...props} ref={ref} />;
});

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

type PathGenerator = PathFunction<object>;

const cache = new Map<string, PathGenerator>();
const cacheLimit = 10000;
function compilePath(path: string): PathGenerator {
  let generator = cache.get(path);
  if (generator) {
    return generator;
  }

  generator = compile(path);

  if (cache.size > cacheLimit) {
    const firstKey = cache.keys().next().value;
    if (firstKey) {
      cache.delete(firstKey);
    }
  }

  cache.set(path, generator);
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

  return compilePath(path)(parsedParams);
}
