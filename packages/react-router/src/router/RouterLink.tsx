import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core";
import { ForwardedRef, forwardRef } from "react";
import { LinkProps, useHref, useLinkClickHandler } from "react-router";

export type IRouterLinkProps = ICoreRouterLinkProps<
  Partial<LinkProps> & { ref: ForwardedRef<HTMLAnchorElement> }
>;

export const RouterLink = forwardRef(function RouterLink(
  { Component, onClick, replace = false, state, target, to, ...rest }: IRouterLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const href = useHref(to || "");
  const handleClick = useLinkClickHandler(to || "", {
    replace,
    state,
    target,
  });

  return (
    <Component
      {...rest}
      to={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      }}
      ref={ref}
      target={target}
    />
  );
});
