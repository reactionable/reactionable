import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import Link, { LinkProps } from "next/link";
import React, { ReactElement } from "react";

export type IRouterLinkProps = ICoreRouterLinkProps & LinkProps;

export function RouterLink(props: IRouterLinkProps): ReactElement {
  return <Link {...props} />;
}
