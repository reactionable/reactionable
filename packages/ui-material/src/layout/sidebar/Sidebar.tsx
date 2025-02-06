import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  INavItemsProps,
  INavItemsProviderProps as ICoreNavItemsProviderProps,
  Sidebar as CoreSidebar,
  useSidebarContext as coreUseSidebarContext,
  ISidebarProps as ICoreSidebarProps,
} from "@reactionable/core";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";

import { ISidebarNavItemProps, SidebarNavItems } from "./SidebarNavItem";
import { INavItemProps } from "../../nav/NavItem";

export type INavItemsProviderProps = ICoreNavItemsProviderProps<
  INavItemsProps<ISidebarNavItemProps>
>;

export type ISidebarProps = ICoreSidebarProps<INavItemsProps<INavItemProps>> & {
  open?: boolean;
};

export function useSidebarContext(): INavItemsProviderProps {
  return coreUseSidebarContext();
}

export function SidebarComponent({ children, open = true }: ISidebarProps): ReactElement {
  const theme = useTheme();

  const [openState, setOpen] = useState<boolean>(open);
  const { navItems } = useSidebarContext();

  const toggleSidebar = () => {
    setOpen((openState) => !openState);
  };

  return (
    <div>
      <Drawer variant="permanent">
        <Toolbar color="primary">
          <IconButton onClick={toggleSidebar} color="secondary" size="large">
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
          <SidebarNavItems navItems={navItems} />
        </List>
      </Drawer>
      <main>{children}</main>
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
