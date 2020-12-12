import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import { ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";

export type IRouterLinkProps = ICoreRouterLinkProps & Omit<LinkProps, "to" | "href" | "component">;

export function RouterLink({ href, Component, ...props }: IRouterLinkProps): ReactElement {
  const linkProps: LinkProps = {
    ...props,
    to: href || "",
    component: Component,
  };

  return <Link {...linkProps} />;
}
