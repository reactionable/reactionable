import AppBar, { AppBarProps } from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { IHeaderProps as ICoreHeaderProps } from "@reactionable/core/lib/ui/layout/header/Header";
import React, { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";

import { INavItemProps, NavItems } from "../../nav/NavItem";
import { Link, isLinkProps } from "../../router/Link";
import { UserHeaderNav } from "./UserHeaderNav";

export type IHeaderProps = ICoreHeaderProps<INavItemProps> & AppBarProps;
export type HeaderComponent = ComponentType<IHeaderProps>;

const useStyles = makeStyles(() =>
  createStyles({
    navItems: {},
    identityNav: {},
  })
);

export const Header = ({
  brand,
  navItems = [],
  ...appBarProps
}: PropsWithChildren<IHeaderProps>): ReactElement => {
  const classes = useStyles();

  let brandContent: ReactNode = null;
  if (brand) {
    const linkProps = isLinkProps(brand) ? brand : { href: "/", children: brand };
    brandContent = (
      <Typography variant="h6">
        <Link {...linkProps} />
      </Typography>
    );
  }

  return (
    <AppBar position="static" {...appBarProps}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {brandContent}
        <div className={classes.navItems}>
          <List>
            <NavItems navItems={navItems} />
          </List>
        </div>
        <UserHeaderNav />
      </Toolbar>
    </AppBar>
  );
};
