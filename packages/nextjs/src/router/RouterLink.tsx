import type { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core";
import Link, { type LinkProps } from "next/link";
import {
	type ForwardedRef,
	forwardRef,
	type PropsWithChildren,
	type ReactElement,
} from "react";

export type IRouterLinkProps = ICoreRouterLinkProps<
	PropsWithChildren<
		Omit<LinkProps, "href" | "Component"> & {
			ref: ForwardedRef<HTMLAnchorElement>;
		}
	>
>;

export const RouterLink = forwardRef(function RouterLink(
	{ Component, children, href = "", ...props }: IRouterLinkProps,
	ref,
): ReactElement {
	const {
		as,
		replace,
		scroll,
		shallow,
		passHref,
		prefetch,
		locale,
		...componentProps
	} = props;

	const linkProps = {
		href,
		as,
		replace,
		scroll,
		shallow,
		passHref,
		prefetch,
		locale,
	};

	return (
		<Link {...linkProps} passHref legacyBehavior>
			<Component
				{...componentProps}
				ref={ref as ForwardedRef<HTMLAnchorElement>}
			>
				{children}
			</Component>
		</Link>
	);
});
