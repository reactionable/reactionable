import { compile, type PathFunction } from "path-to-regexp";
import {
	type ComponentType,
	createElement,
	type ElementType,
	type ForwardedRef,
	forwardRef,
	type ReactElement,
} from "react";

import type { IRouteMatchParams } from "./Route";

export type IRouterLinkProps<Props extends object = object> = Partial<Props> & {
	href?: string;
	ref?: ForwardedRef<HTMLAnchorElement>;
	// biome-ignore lint: the router link component must accept framework-specific props.
	Component: ElementType<any>;
};

export type IRouterLinkComponent<RouterLinkProps extends IRouterLinkProps> =
	ComponentType<RouterLinkProps>;

export type ILinkAnchorProps<RouterLinkProps extends IRouterLinkProps> = Omit<
	RouterLinkProps,
	"Component"
>;

export const RouterLink = forwardRef<HTMLAnchorElement, IRouterLinkProps>(
	function RouterLink(
		routerLinkProps: IRouterLinkProps,
		ref: ForwardedRef<HTMLAnchorElement>,
	): ReactElement {
		const { Component, ref: refProp, ...props } = routerLinkProps;
		void refProp;

		if (!ref) {
			return createElement(Component, props);
		}

		// biome-ignore lint: the forwarded ref is intentionally widened for third-party link components.
		const ComponentWithRef = Component as unknown as ElementType<any>;
		return createElement(ComponentWithRef, { ...props, ref });
	},
);

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

export function generatePath(
	pattern: string,
	...params: IRouteMatchParams[]
): string {
	const parsedParams: Record<string, unknown> = {};
	for (const current of params) {
		Object.assign(parsedParams, current);
	}

	const path = normalizePath(pattern);

	if (path === "/") {
		return path;
	}

	return compilePath(path)(parsedParams);
}
