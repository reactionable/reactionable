import Divider from "@material-ui/core/Divider/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { INavItemsProps } from "@reactionable/core/lib/nav/NavItem";
import { INavItemsProviderProps as ICoreNavItemsProviderProps } from "@reactionable/core/lib/nav/NavItemsContextProvider";
import {
  Sidebar as CoreSidebar,
  useSidebarContext as coreUseSidebarContext,
} from "@reactionable/core/lib/ui/layout/sidebar/Sidebar";
import clsx from "clsx";
import React, { PropsWithChildren, ReactElement, useState } from "react";

import { INavItemProps, NavItems } from "../../nav/NavItem";

export type INavItemsProviderProps = ICoreNavItemsProviderProps<INavItemsProps<INavItemProps>>;

export type ISidebarProps = Partial<INavItemsProviderProps>;

export function useSidebarContext(): INavItemsProviderProps {
  return coreUseSidebarContext();
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      width: 240,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: 240,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
  })
);

export function SidebarComponent({ children }: PropsWithChildren<unknown>): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { navItems } = useSidebarContext();

  const toggleSidebar = () => {
    setOpen((open) => !open);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Toolbar color="primary">
          <IconButton onClick={toggleSidebar} color="secondary">
            {theme.direction === "rtl" ? (
              open ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : open ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <NavItems navItems={navItems} />
        </List>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
}

export function Sidebar(props: PropsWithChildren<ISidebarProps>): ReactElement {
  return <CoreSidebar Component={SidebarComponent} {...props} />;
}
