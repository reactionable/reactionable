import AppBar, { AppBarProps } from "@material-ui/core/AppBar/AppBar";
import List from "@material-ui/core/List";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import { IHeaderProps as ICoreHeaderProps } from "@reactionable/core/lib/ui/layout/header/Header";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";

import { isLinkProps } from "../../link/Link";
import { INavItemProps, NavItems } from "../../nav/NavItem";
import { UserHeaderNav } from "./UserHeaderNav";

export type IHeaderProps = ICoreHeaderProps<INavItemProps> & AppBarProps;
export type HeaderComponent = ComponentType<IHeaderProps>;

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginRight: theme.spacing(5),
    },
    children: {
      flexGrow: 1,
    },
    link: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  })
);

export const Header = ({
  brand,
  navItems = [],
  UserHeaderNavComponent,
  children,
  ...appBarProps
}: PropsWithChildren<IHeaderProps>): ReactElement => {
  const classes = useStyles();
  const { useLink } = useUIContext();

  let brandContent: ReactNode = null;
  if (brand) {
    const linkProps = isLinkProps(brand) ? brand : { href: "/", children: brand };
    const link = useLink({
      ...linkProps,
      className: classes.link,
    });
    brandContent = (
      <Typography variant="h6" className={classes.title}>
        {link}
      </Typography>
    );
  }

  if (!UserHeaderNavComponent) {
    UserHeaderNavComponent = UserHeaderNav;
  }

  return (
    <AppBar position="static" color="default" {...appBarProps} component="header">
      <Toolbar>
        {brandContent}
        <div className={classes.children}>
          {children || (
            <List>
              <NavItems navItems={navItems} />
            </List>
          )}
        </div>
        <UserHeaderNavComponent />
      </Toolbar>
    </AppBar>
  );
};
