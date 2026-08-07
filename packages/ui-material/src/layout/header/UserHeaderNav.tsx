import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
	AccountLink,
	LogoutLink,
	UserUnloggedHeaderNav,
	useIdentityContext,
} from "@reactionable/core";
import {
	type ForwardedRef,
	forwardRef,
	type MouseEvent,
	type ReactElement,
	useState,
} from "react";

import type { ILinkProps } from "../../link/Link";

export { UserUnloggedHeaderNav } from "@reactionable/core";

const NavItemComponent = forwardRef(function NavItemComponent(
	{ children, onClick }: ILinkProps,
	// biome-ignore lint: Material UI forwards a generic ref type here.
	ref: ForwardedRef<any>,
) {
	return (
		<MenuItem onClick={onClick} ref={ref}>
			{children}
		</MenuItem>
	);
});

const UserLoggedHeaderNav = () => {
	const { user, displayName } = useIdentityContext();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	if (!user) {
		return null;
	}

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				edge="end"
				aria-label={displayName() || ""}
				aria-controls="user-menu"
				aria-haspopup="true"
				onClick={handleClick}
				color="inherit"
				size="large"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="user-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<AccountLink
					NavItemComponent={NavItemComponent}
					onClick={handleClose}
				/>
				<hr />
				<LogoutLink NavItemComponent={NavItemComponent} onClick={handleClose} />
			</Menu>
		</>
	);
};

export const UserHeaderNav = (): ReactElement | null => {
	const { identityProvider } = useIdentityContext();

	if (!identityProvider) {
		return null;
	}

	return (
		<div>
			<UserLoggedHeaderNav />
			<UserUnloggedHeaderNav NavItemComponent={NavItemComponent} />
		</div>
	);
};
