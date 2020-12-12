import { compile } from "path-to-regexp";
import {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  Ref,
  RefAttributes,
  createElement,
  forwardRef,
} from "react";

import { IRouteMatchParams } from "./Route";

export type IRouterLinkPropsComponent<Props> = ForwardRefExoticComponent<Props>;

export type IRouterLinkProps<
  Props extends Record<string, unknown> = Record<string, unknown>
> = Props & {
  href?: string;
  Component?: IRouterLinkPropsComponent<Props>;
};

export type IRouterLinkComponent<
  RouterLinkProps extends IRouterLinkProps
> = ForwardRefExoticComponent<
  PropsWithoutRef<RouterLinkProps> & RefAttributes<ElementType<ILinkAnchorProps<RouterLinkProps>>>
>;

export type ILinkAnchorProps<RouterLinkProps extends IRouterLinkProps> = Omit<
  RouterLinkProps,
  "Component"
>;

function LinkAnchorComponent<RouterLinkProps extends IRouterLinkProps>(
  props: ILinkAnchorProps<RouterLinkProps>,
  ref: Ref<HTMLAnchorElement>
) {
  return <a ref={ref} {...props} />;
}

export const LinkAnchor = forwardRef(LinkAnchorComponent);

function RouterLinkComponent<RouterLinkProps extends IRouterLinkProps>(
  { Component = LinkAnchor, ...props }: RouterLinkProps,
  ref: Ref<ElementType<RouterLinkProps>>
) {
  return createElement(Component, { ...props, ref });
}

export const RouterLink = forwardRef<
  ElementType<ILinkAnchorProps<IRouterLinkProps>>,
  IRouterLinkProps
>(RouterLinkComponent);

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
