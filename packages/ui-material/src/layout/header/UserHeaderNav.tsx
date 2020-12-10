import IconButton from "@material-ui/core/IconButton/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { AccountCircle } from "@material-ui/icons";
import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import {
  AccountLink,
  LogoutLink,
  UserUnloggedHeaderNav,
} from "@reactionable/core/lib/ui/layout/header/UserHeaderNav";
import { ComponentProps, MouseEvent, ReactElement, useState } from "react";

export { UserUnloggedHeaderNav } from "@reactionable/core/lib/ui/layout/header/UserHeaderNav";

type INavItemProps = ComponentProps<typeof MenuItem>;

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
        aria-label={displayName()}
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
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
        <AccountLink<INavItemProps> NavItemComponent={MenuItem} onClick={handleClose} />
        <hr />
        <LogoutLink<INavItemProps> NavItemComponent={MenuItem} onClick={handleClose} />
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
      <UserUnloggedHeaderNav />
    </div>
  );
};
