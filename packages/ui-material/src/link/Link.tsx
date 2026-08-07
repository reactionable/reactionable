import UILink, { type LinkProps } from "@mui/material/Link";
import {
	Link as CoreLink,
	isLinkProps as coreIsLinkProps,
	type ILinkProps as ICoreLinkProps,
} from "@reactionable/core";
import {
	type ForwardedRef,
	forwardRef,
	type ReactElement,
	type ReactNode,
} from "react";

export type ILinkProps = LinkProps & ICoreLinkProps;

export const Link = forwardRef(function Link(
	props: ILinkProps,
	ref: ForwardedRef<HTMLAnchorElement>,
): ReactElement {
	return <UILink component={CoreLink} {...props} ref={ref} />;
});

export function isLinkProps<LinkProps extends ILinkProps>(
	props: ReactNode | LinkProps,
): props is LinkProps {
	return coreIsLinkProps<ILinkProps>(props);
}

export function useLink<LinkProps extends ILinkProps = ILinkProps>(
	props: LinkProps,
): ReactElement {
	return <Link {...props} />;
}
