import React, {
  Children,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  useCallback,
} from "react";

import { ILinkProps } from "./Link";

export type IRouterLinkProps<LinkProps extends ILinkProps = ILinkProps> = LinkProps & {
  children: ReactElement;
};

export type IRouterLinkComponent<LinkProps extends ILinkProps = ILinkProps> = ComponentType<
  IRouterLinkProps<LinkProps>
>;

export function RouterLink<LinkProps extends ILinkProps>({
  children,
  ...props
}: PropsWithChildren<IRouterLinkProps<LinkProps>>): ReactElement {
  const child: ReactElement = Children.only<ReactElement>(children);
  const childRef: { current: Element } | ((el: Element) => void) =
    child && typeof child === "object" && child["ref"];

  const setRef = useCallback(
    (el: Element) => {
      if (childRef) {
        if (typeof childRef === "function") childRef(el);
        else if (typeof childRef === "object") {
          childRef.current = el;
        }
      }
    },
    [childRef]
  );

  const childProps = {
    ref: setRef,
    ...props,
  } as IRouterLinkProps<LinkProps> & {
    ref?: (el: Element) => void;
  };

  return React.cloneElement(child, childProps);
}
