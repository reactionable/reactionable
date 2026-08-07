import {
	NavItems as CoreNavItems,
	type INavItemProps as ICoreNavItemProps,
	type INavItemsComponentProps,
} from "@reactionable/core";
import type { ReactElement } from "react";
import NavLink, { type NavLinkProps } from "react-bootstrap/NavLink";

import { Icon, type IIconProps } from "../icon/Icon";
import { Link } from "../link/Link";

export type INavItemProps = ICoreNavItemProps &
	Omit<NavLinkProps, "onSelect"> & { icon?: IIconProps };

export function NavItem({
	icon,
	children,
	...linkProps
}: INavItemProps): ReactElement {
	if (!linkProps.title && typeof children === "string") {
		const title: string = children as string;
		linkProps.title = title;
	}

	if (icon) {
		children = (
			<>
				<Icon {...icon} /> {children}
			</>
		);
	}
	return (
		<NavLink {...(linkProps as NavLinkProps)} as={Link}>
			{children}
		</NavLink>
	);
}

export function NavItems(
	props: INavItemsComponentProps<INavItemProps>,
): ReactElement | null {
	return <CoreNavItems<INavItemProps> Component={NavItem} {...props} />;
}
