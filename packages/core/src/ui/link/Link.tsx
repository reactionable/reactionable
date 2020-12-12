import {
  ComponentType,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
  forwardRef,
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

export type LinkComponent = ComponentType<ILinkProps>;

export function useLink(props: ILinkProps): ReactElement {
  return <Link {...props} />;
}

function LinkComponent(props: ILinkProps, ref: Ref<ComponentType<ILinkProps>>) {
  const { RouterLink } = useRouterContext();
  return <RouterLink {...props} ref={ref} />;
}

export const Link = forwardRef(LinkComponent);
