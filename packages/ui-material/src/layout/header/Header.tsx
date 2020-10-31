import AppBar, { AppBarProps } from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, isLinkProps } from '@reactionable/core/lib/router/Link';
import { IHeaderProps as ICoreHeaderProps } from '@reactionable/core/lib/ui/layout/header/Header';
import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';

import { INavItemProps, navItemToComponent } from '../../nav/NavItem';
import { UserHeaderNav } from './UserHeaderNav';

export type IHeaderProps = ICoreHeaderProps<INavItemProps> & AppBarProps;
export type HeaderComponent = ComponentType<IHeaderProps>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navItems: {},
    identityNav: {},
  })
);

export const Header = ({
  brand,
  navItems = [],
  ...appBarProps
}: PropsWithChildren<IHeaderProps>) => {
  const classes = useStyles();

  let brandContent: ReactNode = <></>;
  if (brand) {
    brandContent = (
      <Typography variant="h6">
        {isLinkProps(brand) ? <Link {...brand} /> : <Link href="/">{brand}</Link>}
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
        <div className={classes.navItems}>{navItems?.map(navItemToComponent)}</div>
        <UserHeaderNav />
      </Toolbar>
    </AppBar>
  );
};
