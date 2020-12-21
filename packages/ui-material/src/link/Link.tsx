import UILink, { LinkProps } from "@material-ui/core/Link";
import {
  Link as CoreLink,
  ILinkProps as ICoreLinkProps,
  isLinkProps as coreIsLinkProps,
} from "@reactionable/core/lib/ui/link/Link";
import { ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";

export type ILinkProps = LinkProps & ICoreLinkProps;

export const Link = forwardRef(function Link(
  props: ILinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  return <UILink component={CoreLink} {...props} ref={ref} />;
});

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return coreIsLinkProps<ILinkProps>(props);
}

export function useLink<LinkProps extends ILinkProps = ILinkProps>(props: LinkProps): ReactElement {
  return <Link {...props} />;
}
