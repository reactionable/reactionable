import { SvgIcon } from "@material-ui/core";
import { LinkProps } from "@material-ui/core/Link/Link";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {
  NavItem as CoreNavItem,
  NavItems as CoreNavItems,
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
} from "@reactionable/core/lib/nav/NavItem";
import React, { ReactElement } from "react";

import { Icon } from "../icon/Icon";

export type INavItemProps = ICoreNavItemProps & LinkProps & { icon?: typeof SvgIcon };

export function NavItem(props: INavItemProps): ReactElement {
  const { icon, children, href, ...linkProps } = props;
  return (
    <CoreNavItem href={href}>
      <ListItem button component="a" {...linkProps}>
        {icon && (
          <ListItemIcon>
            <Icon icon={icon} />
          </ListItemIcon>
        )}
        <ListItemText primary={children} />
      </ListItem>
    </CoreNavItem>
  );
}

export function NavItems(props: INavItemsComponentProps<INavItemProps>): ReactElement | null {
  return <CoreNavItems<INavItemProps> Component={NavItem} {...props} />;
}
