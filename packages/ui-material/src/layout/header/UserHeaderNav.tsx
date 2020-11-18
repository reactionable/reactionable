import IconButton from "@material-ui/core/IconButton/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { AccountCircle } from "@material-ui/icons";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import { useIdentityContext } from "@reactionable/core/lib/identity/Identity";
import { useRouterContext } from "@reactionable/core/lib/router/Router";
import { UserUnloggedHeaderNav } from "@reactionable/core/lib/ui/layout/header/UserHeaderNav";
import React, { ComponentType, MouseEvent, useState } from "react";

const UserLoggedHeaderNav = () => {
  const { user, logout } = useIdentityContext();
  const { RouterLink } = useRouterContext();
  const { t } = useTranslation("identity");
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
        aria-label={user.displayName()}
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
        <MenuItem onClick={handleClose}>
          <RouterLink href="/account">{t("My account")}</RouterLink>
        </MenuItem>
        <hr />
        <MenuItem onClick={logout}>{t("Log out")}</MenuItem>
      </Menu>
    </>
  );
};

export type IUserHeaderProps = Record<string, unknown>;
export type UserHeaderNavComponent<H extends IUserHeaderProps = IUserHeaderProps> = ComponentType<
  H
>;

export const UserHeaderNav: UserHeaderNavComponent = () => {
  const { identityProvider } = useIdentityContext();

  if (!identityProvider) {
    return null;
  }

  return (
    <div>
      <UserLoggedHeaderNav />,
      <UserUnloggedHeaderNav />,
    </div>
  );
};
