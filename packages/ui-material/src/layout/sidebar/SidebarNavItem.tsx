import { SvgIcon } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
  NavItems,
} from "@reactionable/core/lib/nav/NavItem";
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
          <Icon icon={icon} />
        </ListItemIcon>
        {listItemChildren}
      </>
    );
  }

  return (
    <ListItem button component={Link} {...linkProps}>
      {listItemChildren}
    </ListItem>
  );
}

export function SidebarNavItems(
  props: INavItemsComponentProps<ISidebarNavItemProps>
): ReactElement | null {
  return <NavItems<ISidebarNavItemProps> Component={SidebarNavItem} {...props} />;
}
