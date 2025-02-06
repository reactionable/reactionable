import { LinkProps, SvgIcon } from "@mui/material";
import Button from "@mui/material/Button";
import {
  NavItems as CoreNavItems,
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
} from "@reactionable/core";
import { ReactElement } from "react";

import { Icon } from "../icon/Icon";
import { Link } from "../link/Link";

export type INavItemProps = ICoreNavItemProps &
  Pick<LinkProps, "className"> & { icon?: typeof SvgIcon };

export function NavItem(props: INavItemProps): ReactElement {
  const { icon, children, ...linkProps } = props;

  if (!linkProps.title && typeof children === "string") {
    linkProps.title = children;
  }

  return (
    <Button component={Link} {...linkProps} startIcon={icon ? <Icon icon={icon} /> : undefined}>
      {children}
    </Button>
  );
}

export function NavItems(props: INavItemsComponentProps<INavItemProps>): ReactElement | null {
  return <CoreNavItems<INavItemProps> Component={NavItem} {...props} />;
}
