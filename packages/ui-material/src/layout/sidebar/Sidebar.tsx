import Drawer from '@material-ui/core/Drawer/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {
  INavItemsContext,
  INavItemsProps,
  createNavItemContextProvider,
} from '@reactionable/core/lib/nav/NavItem';
import React, { ComponentType, PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { INavItemProps, navItemToComponent } from '../../nav/NavItem';

export type ISidebarNavItemProps = INavItemProps;

export interface ISidebarProps extends INavItemsProps<ISidebarNavItemProps> {}

export type ISidebarContext = INavItemsContext<ISidebarNavItemProps>;

const contextProvider = createNavItemContextProvider<ISidebarProps>({});

export const {
  NavItemContextProvider: SidebarContextProvider,
  useNavItemContext: useSidebarContext,
  NavItemContextConsumer: SidebarContextConsumer,
} = contextProvider;

export function listItemToComponent(props: INavItemProps): ReactNode {
  const { icon, ...linkProps } = props;
  const key = `${linkProps.href}`;

  return (
    <ListItem button key={key}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={navItemToComponent(linkProps)} />
    </ListItem>
  );
}

const SidebarItems: ComponentType = () => {
  const [open, setOpen] = useState(true);
  const { navItems } = useSidebarContext();

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <List>{navItems?.map(listItemToComponent)}</List>
    </Drawer>
  );
};

export function Sidebar({ children }: PropsWithChildren<ISidebarProps>) {
  return (
    <SidebarContextProvider>
      <SidebarItems />
      {children}
    </SidebarContextProvider>
  );
}

export function setSidebarNavItems(navItems: Array<INavItemProps>) {
  const { setNavItems } = useSidebarContext();

  useEffect(() => {
    setNavItems(navItems);
  }, navItems);
}
