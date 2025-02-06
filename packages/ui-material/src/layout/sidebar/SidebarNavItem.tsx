import { SvgIcon } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
  NavItems,
} from "@reactionable/core";
import { ReactElement, isValidElement } from "react";

import { Icon } from "../../icon/Icon";
import { Link } from "../../link/Link";

export type ISidebarNavItemProps = ICoreNavItemProps & { icon?: typeof SvgIcon };

export function SidebarNavItem(props: ISidebarNavItemProps): ReactElement {
  const { icon, children, ...linkProps } = props;

  if (!linkProps.title && typeof children === "string") {
    linkProps.title = children;
  }

  let listItemChildren: ReactElement = isValidElement(children) ? (
    children
  ) : (
    <ListItemText primary={children} />
  );

  if (icon) {
    listItemChildren = (
      <>
        <ListItemIcon>
          <Icon icon={icon} color="primary" />
        </ListItemIcon>
        {listItemChildren}
      </>
    );
  }

  return (
    <ListItem component={Link} {...linkProps}>
      {listItemChildren}
    </ListItem>
  );
}

export function SidebarNavItems(
  props: INavItemsComponentProps<ISidebarNavItemProps>
): ReactElement | null {
  return <NavItems<ISidebarNavItemProps> Component={SidebarNavItem} {...props} />;
}
