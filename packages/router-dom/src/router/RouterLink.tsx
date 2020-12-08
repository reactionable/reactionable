import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import React, { ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";

export type IRouterLinkProps = ICoreRouterLinkProps & Omit<LinkProps, "to" | "href">;

export function RouterLink({ href, ...props }: IRouterLinkProps): ReactElement {
  const linkProps: LinkProps = {
    ...props,
    to: href || "",
  };

  return <Link {...linkProps} />;
}
