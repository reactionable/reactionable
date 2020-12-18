import { SvgIcon } from "@material-ui/core";
import { LinkProps } from "@material-ui/core/Link/Link";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {
  NavItems as CoreNavItems,
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
} from "@reactionable/core/lib/nav/NavItem";
import { ReactElement } from "react";

import { Icon } from "../icon/Icon";
import { Link } from "../link/Link";

export type INavItemProps = ICoreNavItemProps & LinkProps & { icon?: typeof SvgIcon };

export function NavItem(props: INavItemProps): ReactElement {
  const { icon, children, ...linkProps } = props;

  if (!linkProps.title && typeof children === "string") {
    linkProps.title = children;
  }

  return (
    <ListItem button component={Link} {...linkProps}>
      {icon && (
        <ListItemIcon>
          <Icon icon={icon} />
        </ListItemIcon>
      )}
      <ListItemText primary={children} />
    </ListItem>
  );
}

export function NavItems(props: INavItemsComponentProps<INavItemProps>): ReactElement | null {
  return <CoreNavItems<INavItemProps> Component={NavItem} {...props} />;
}
