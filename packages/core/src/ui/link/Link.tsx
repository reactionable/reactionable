import {
  ComponentType,
  ForwardedRef,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  forwardRef,
} from "react";

import { useRouterContext } from "../../router/Router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LinkForwardedRef = ForwardedRef<any>;

export type ILinkComponentProps = Omit<ILinkProps, "Component"> & { ref?: LinkForwardedRef };
export type LinkComponent = ComponentType<ILinkComponentProps>;

// Commmon props of what could be a link (should be as generic as possible to be extended without issues)
export type ILinkProps = {
  href?: string;
  title?: string;
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: ReactMouseEvent<any, MouseEvent>) => void;
  "data-testid"?: string;
  Component?: LinkComponent;
};

export const LinkAnchor = forwardRef(function LinkAnchor(
  props: ILinkComponentProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  return <a {...props} ref={ref} />;
});

export const Link = forwardRef(function Link(
  { Component = LinkAnchor, ...props }: ILinkProps,
  ref
): ReactElement {
  if (props.href) {
    const { RouterLink } = useRouterContext();
    return <RouterLink {...props} Component={Component} ref={ref} />;
  }

  return <Component {...props} ref={ref} />;
});

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return (props as ILinkProps).href !== undefined;
}

export function useLink(props: ILinkProps): ReactElement {
  return <Link {...props} />;
}
