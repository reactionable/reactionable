import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import { Children, ReactElement, isValidElement } from "react";
import { Link, LinkProps } from "react-router-dom";

export type IRouterLinkProps = ICoreRouterLinkProps & Omit<LinkProps, "to" | "href">;

export function RouterLink({ href, children, ...props }: IRouterLinkProps): ReactElement {
  const linkProps: LinkProps = {
    ...props,
    to: href || "",
  };

  if (
    children &&
    Children.count(children) === 1 &&
    typeof children !== "string" &&
    isValidElement(children) &&
    children.type === "a"
  ) {
    children = children.props.children;
  }

  return <Link {...linkProps}>{children}</Link>;
}
