import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IHeaderProps as ICoreHeaderProps, useUIContext } from "@reactionable/core";
import { ComponentType, PropsWithChildren, ReactElement, ReactNode } from "react";

import { isLinkProps } from "../../link/Link";
import { INavItemProps, NavItems } from "../../nav/NavItem";
import { UserHeaderNav } from "./UserHeaderNav";

export type IHeaderProps = ICoreHeaderProps<INavItemProps> & AppBarProps;
export type HeaderComponent = ComponentType<IHeaderProps>;

export const Header = ({
  brand,
  navItems = [],
  UserHeaderNavComponent,
  children,
  ...appBarProps
}: PropsWithChildren<IHeaderProps>): ReactElement => {
  const { useLink } = useUIContext();

  let brandContent: ReactNode = null;
  if (brand) {
    const linkProps = isLinkProps(brand) ? brand : { href: "/", children: brand };
    const link = useLink({
      ...linkProps,
      sx: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    });
    brandContent = (
      <Typography
        variant="h6"
        sx={{
          marginRight: (theme) => theme.spacing(5),
        }}
      >
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
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {children || (
            <List>
              <NavItems navItems={navItems} />
            </List>
          )}
        </Box>
        <UserHeaderNavComponent />
      </Toolbar>
    </AppBar>
  );
};
