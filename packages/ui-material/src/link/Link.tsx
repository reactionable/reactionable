import UILink, { LinkProps } from "@material-ui/core/Link";
import { isLinkProps as coreIsLinkProps } from "@reactionable/core/lib/ui/link/Link";
import { useRouterProviderProps } from "@reactionable/core/src/router/Router";
import { ReactNode } from "react";
import { PropsWithChildren, ReactElement } from "react";

export type ILinkProps = LinkProps;

export function Link(props: PropsWithChildren<ILinkProps>): ReactElement {
  const { RouterLink } = useRouterProviderProps();
  return <UILink component={RouterLink} {...props} />;
}

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return coreIsLinkProps<ILinkProps>(props);
}

export function useLink<LinkProps extends ILinkProps = ILinkProps>(props: LinkProps): ReactElement {
  return <Link {...props} />;
}
