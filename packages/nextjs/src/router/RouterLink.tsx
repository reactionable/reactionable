import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import Link, { LinkProps } from "next/link";
import { Children, ReactElement, ReactNode } from "react";

export type IRouterLinkProps = ICoreRouterLinkProps & LinkProps;

export function RouterLink({ Component, children, ...props }: IRouterLinkProps): ReactElement {
  if (Children.count(children) > 1) {
    children = <>{children}</>;
  }

  if (Component) {
    const {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      ...componentProps
    } = props;

    const linkProps = {
      children,
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
    };

    return (
      <Link {...linkProps} passHref>
        <Component {...componentProps}>{children}</Component>
      </Link>
    );
  }
  return (
    <Link {...props} passHref>
      {children as ReactNode}
    </Link>
  );
}
