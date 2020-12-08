import Divider from "@material-ui/core/Divider/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { INavItemsProps } from "@reactionable/core/lib/nav/NavItem";
import { INavItemsProviderProps as ICoreNavItemsProviderProps } from "@reactionable/core/lib/nav/NavItemsContextProvider";
import {
  Sidebar as CoreSidebar,
  useSidebarContext as coreUseSidebarContext,
} from "@reactionable/core/lib/ui/layout/sidebar/Sidebar";
import clsx from "clsx";
import React, { PropsWithChildren, ReactElement, useEffect, useState } from "react";

import { INavItemProps, NavItems } from "../../nav/NavItem";

export type INavItemsProviderProps = ICoreNavItemsProviderProps<INavItemsProps<INavItemProps>>;

export type ISidebarProps = Partial<INavItemsProviderProps> & ISidebarComponentProps;

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
      width: theme.spacing(25),
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerPaper: {
      marginTop: theme.spacing(8) + 1,
    },
    drawerOpen: {
      width: theme.spacing(25),
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

export type ISidebarComponentProps = {
  open?: boolean;
};

export function SidebarComponent({
  children,
  open = true,
}: PropsWithChildren<ISidebarComponentProps>): ReactElement {
  const classes = useStyles();
  const theme = useTheme();

  const [openState, setOpen] = useState<boolean>(open);
  const { navItems } = useSidebarContext();

  const toggleSidebar = () => {
    setOpen((openState) => !openState);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openState,
          [classes.drawerClose]: !openState,
        })}
        classes={{
          paper: clsx({
            [classes.drawerPaper]: true,
            [classes.drawerOpen]: openState,
            [classes.drawerClose]: !openState,
          }),
        }}
      >
        <Toolbar color="primary">
          <IconButton onClick={toggleSidebar} color="secondary">
            {theme.direction === "rtl" ? (
              openState ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : openState ? (
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

export function Sidebar({ ...props }: PropsWithChildren<ISidebarProps>): ReactElement {
  const [open, setOpen] = useState<boolean | undefined>(props.open);
  const theme = useTheme();
  const upToMd = useMediaQuery(theme.breakpoints.up("md"));
  useEffect(() => {
    if (open === undefined) {
      setOpen(upToMd);
    }
  }, [upToMd, open]);

  return (
    <CoreSidebar<ISidebarProps>
      Component={SidebarComponent}
      sidebar={{ open: Boolean(open) }}
      {...props}
    />
  );
}
