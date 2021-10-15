import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { INavItemsProps } from "@reactionable/core/lib/nav/NavItem";
import { INavItemsProviderProps as ICoreNavItemsProviderProps } from "@reactionable/core/lib/nav/NavItemsProviderProps";
import {
  Sidebar as CoreSidebar,
  ISidebarProps as ICoreSidebarProps,
  useSidebarContext as coreUseSidebarContext,
} from "@reactionable/core/lib/ui/layout/sidebar/Sidebar";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";

import { INavItemProps } from "../../nav/NavItem";
import { Drawer } from "./Drawer";
import { DrawerHeader } from "./DrawerHeader";
import { ISidebarNavItemProps, SidebarNavItems } from "./SidebarNavItem";

export type INavItemsProviderProps = ICoreNavItemsProviderProps<
  INavItemsProps<ISidebarNavItemProps>
>;

export type ISidebarProps = ICoreSidebarProps<INavItemsProps<INavItemProps>> & {
  open?: boolean;
};

export function useSidebarContext(): INavItemsProviderProps {
  return coreUseSidebarContext();
}

export type ISidebarComponentProps = {
  open?: boolean;
};

export function SidebarComponent({
  children,
  open = true,
}: PropsWithChildren<ISidebarComponentProps>): ReactElement {
  const theme = useTheme();

  const [openState, setOpen] = useState<boolean>(open);
  const { navItems } = useSidebarContext();

  const toggleSidebar = () => {
    setOpen((openState) => !openState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={openState}>
        <DrawerHeader>
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
        </DrawerHeader>
        <Divider />
        <List>
          <SidebarNavItems navItems={navItems} />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
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
