import { ILinkProps as ICoreLinkProps } from "@reactionable/core/lib/router/Link";
import React, { ReactElement } from "react";
import { Link, LinkProps as RouterLinkProps } from "react-router-dom";

export type ILinkProps = ICoreLinkProps & Omit<RouterLinkProps, "to">;

export function RouterLink<LinkProps extends ILinkProps>({
  href,
  ...props
}: LinkProps): ReactElement {
  const linkProps: RouterLinkProps = {
    ...props,
    to: href || "",
  };

  return <Link {...linkProps} />;
}
