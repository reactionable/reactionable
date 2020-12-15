import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import { ComponentProps, ReactElement, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

export type IRouterLinkProps = ICoreRouterLinkProps & Omit<LinkProps, "to" | "href" | "component">;

export function RouterLink({ href, Component, ...props }: IRouterLinkProps): ReactElement {
  const component = Component
    ? forwardRef(function LinkComponent(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { navigate, ...props }: ComponentProps<typeof Component>,
        ref
      ) {
        return <Component {...props} ref={ref} />;
      })
    : undefined;

  const linkProps: LinkProps = {
    ...props,
    to: href || "",
    component,
  };

  return <Link {...linkProps} />;
}
