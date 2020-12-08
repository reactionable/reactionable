import UILink, { LinkProps } from "@material-ui/core/Link";
import {
  Link as CoreLink,
  ILinkProps as ICoreLinkProps,
  isLinkProps as coreIsLinkProps,
} from "@reactionable/core/lib/ui/link/Link";
import React, { Children, ReactNode, isValidElement } from "react";
import { PropsWithChildren, ReactElement } from "react";

export type ILinkProps = Omit<LinkProps, "children"> & ICoreLinkProps;

export function Link({ href, children, ...props }: PropsWithChildren<LinkProps>): ReactElement {
  if (
    !(
      children &&
      Children.count(children) === 1 &&
      typeof children !== "string" &&
      isValidElement(children)
    )
  ) {
    children = <UILink {...props}>{children}</UILink>;
  }

  return <CoreLink href={href}>{children}</CoreLink>;
}

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return coreIsLinkProps<ILinkProps>(props);
}

export function useLink<LinkProps extends ILinkProps = ILinkProps>(props: LinkProps): ReactElement {
  return <Link {...props} />;
}
