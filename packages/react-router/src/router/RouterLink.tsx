import type { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core";
import { type ForwardedRef, forwardRef, type MouseEvent } from "react";
import { type LinkProps, useHref, useLinkClickHandler } from "react-router";

export type IRouterLinkProps = ICoreRouterLinkProps<Partial<LinkProps>>;

export const RouterLink = forwardRef(function RouterLink(
	{
		Component,
		onClick,
		replace = false,
		state,
		target,
		to,
		href,
		reloadDocument,
		download,
		...rest
	}: IRouterLinkProps,
	ref: ForwardedRef<HTMLAnchorElement>,
) {
	const destination = to ?? href ?? "";
	const external =
		typeof destination === "string" &&
		/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(destination);
	const resolvedHref = useHref(external ? "" : destination);
	const handleClick = useLinkClickHandler(external ? "" : destination, {
		replace,
		state,
		target,
	});

	return (
		<Component
			{...rest}
			href={external ? destination : resolvedHref}
			download={download}
			onClick={(event: MouseEvent<HTMLAnchorElement>) => {
				onClick?.(event);
				if (
					!event.defaultPrevented &&
					!external &&
					!reloadDocument &&
					!download
				) {
					handleClick(event);
				}
			}}
			ref={ref}
			target={target}
		/>
	);
});
