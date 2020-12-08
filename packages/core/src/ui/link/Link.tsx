import React, {
  Children,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  isValidElement,
} from "react";

import { useRouterContext } from "../../router/Router";

export function isLinkProps<LinkProps extends ILinkProps>(
  props: ReactNode | LinkProps
): props is LinkProps {
  return (props as ILinkProps).href !== undefined;
}

// Commmon props of what could be a link (should be as generic as possible to be extended without issues)
export type ILinkProps = {
  href?: string;
  title?: string;
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: ReactMouseEvent<any, MouseEvent>) => void;
  "data-testid"?: string;
};

export type LinkComponent<LinkProps extends ILinkProps> = ComponentType<LinkProps>;

export function Link<LinkProps extends ILinkProps>({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>): ReactElement {
  const { RouterLink } = useRouterContext();

  let link: ReactElement;
  if (
    children &&
    Children.count(children) === 1 &&
    typeof children !== "string" &&
    isValidElement(children)
  ) {
    link = children;
  } else {
    if (!props.title && typeof children === "string") {
      props.title = children;
    }

    link = <a {...props}>{children}</a>;
  }

  return <RouterLink href={href || "#"}>{link}</RouterLink>;
}

export function useLink<LinkProps extends ILinkProps = ILinkProps>(props: LinkProps): ReactElement {
  return <Link {...props} />;
}
