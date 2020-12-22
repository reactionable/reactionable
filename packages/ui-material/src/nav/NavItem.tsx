import { SvgIcon } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  NavItems as CoreNavItems,
  INavItemProps as ICoreNavItemProps,
  INavItemsComponentProps,
} from "@reactionable/core/lib/nav/NavItem";
import { ReactElement } from "react";

import { Icon } from "../icon/Icon";
import { Link } from "../link/Link";

export type INavItemProps = ICoreNavItemProps & { icon?: typeof SvgIcon };

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
