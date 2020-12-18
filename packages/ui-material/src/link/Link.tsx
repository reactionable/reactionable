import UILink, { LinkProps } from "@material-ui/core/Link";
import { useRouterContext } from "@reactionable/core/lib/router/Router";
import { isLinkProps as coreIsLinkProps } from "@reactionable/core/lib/ui/link/Link";
import { ForwardedRef, ReactNode, forwardRef } from "react";
import { PropsWithChildren, ReactElement } from "react";

export type ILinkProps = LinkProps;

export const Link = forwardRef(function Link(
  props: PropsWithChildren<ILinkProps>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: ForwardedRef<any>
): ReactElement {
  const { RouterLink } = useRouterContext();
  return <UILink component={RouterLink} {...props} ref={ref} />;
});

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return coreIsLinkProps<ILinkProps>(props);
}

export function useLink<LinkProps extends ILinkProps = ILinkProps>(props: LinkProps): ReactElement {
  return <Link {...props} />;
}
