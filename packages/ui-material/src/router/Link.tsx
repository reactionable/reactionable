import UiLink, { LinkProps } from "@material-ui/core/Link";
import {
  ILinkProps as ICoreLinkProps,
  isLinkProps as coreIsLinkProps,
} from "@reactionable/core/lib/router/Link";
import { useRouterContext } from "@reactionable/core/lib/router/Router";
import React, { ReactNode } from "react";
import { PropsWithChildren, ReactElement } from "react";

export type ILinkProps = Omit<LinkProps, "children"> & ICoreLinkProps;

export function Link<LinkProps extends ILinkProps>({
  href,
  ...props
}: PropsWithChildren<LinkProps>): ReactElement {
  const { RouterLink } = useRouterContext();
  return (
    <RouterLink href={href}>
      <UiLink {...props} />
    </RouterLink>
  );
}

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return coreIsLinkProps<ILinkProps>(props);
}
