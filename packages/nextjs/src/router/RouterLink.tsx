import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import Link, { LinkProps } from "next/link";
import { ReactElement } from "react";

export type IRouterLinkProps = ICoreRouterLinkProps & LinkProps;

export function RouterLink({ Component, ...props }: IRouterLinkProps): ReactElement {
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
        <Component {...componentProps} />
      </Link>
    );
  }
  return <Link {...props} />;
}
