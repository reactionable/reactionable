import { ILinkProps as ICoreLinkProps } from "@reactionable/core/lib/router/Link";
import { IRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import Link, { LinkProps as NextLinkProps } from "next/link";
import React, { PropsWithChildren, ReactElement } from "react";

export type ILinkProps = ICoreLinkProps & Omit<NextLinkProps, "href">;

export function RouterLink<LinkProps extends ILinkProps>({
  href,
  ...props
}: PropsWithChildren<IRouterLinkProps<LinkProps>>): ReactElement {
  const linkProps: NextLinkProps = {
    ...props,
    href: href || "",
  };

  return <Link {...linkProps} />;
}
