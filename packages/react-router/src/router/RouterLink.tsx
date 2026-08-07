import type { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core";
import { type ForwardedRef, forwardRef, type MouseEvent } from "react";
import {
	href,
	type LinkProps,
	useHref,
	useLinkClickHandler,
} from "react-router";

export type IRouterLinkProps = ICoreRouterLinkProps<Partial<LinkProps>>;

export const RouterLink = forwardRef(function RouterLink(
	{
		Component,
		onClick,
		replace = false,
		state,
		target,
		to,
		...rest
	}: IRouterLinkProps,
	ref: ForwardedRef<HTMLAnchorElement>,
) {
	const toHref = useHref(to ? href(to.toString()) : "");
	const handleClick = useLinkClickHandler(to || "", {
		replace,
		state,
		target,
	});

	return (
		<Component
			{...rest}
			to={toHref}
			onClick={(event: MouseEvent<HTMLAnchorElement>) => {
				onClick?.(event);
				if (!event.defaultPrevented) {
					handleClick(event);
				}
			}}
			ref={ref}
			target={target}
		/>
	);
});
