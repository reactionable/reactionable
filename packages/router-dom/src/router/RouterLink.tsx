import { IRouterLinkProps as ICoreRouterLinkProps } from "@reactionable/core/lib/router/RouterLink";
import { ForwardedRef, ReactElement, forwardRef } from "react";
import { LinkProps, Link as RouterDomLink } from "react-router-dom";

export type IRouterLinkProps = ICoreRouterLinkProps<
  Partial<Omit<LinkProps, "to" | "href" | "component">>
>;

export const RouterLink = forwardRef(function RouterLink(
  { Component, href = "", ...props }: IRouterLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const Link = forwardRef(function Link(
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      navigate, // Do not inject this props provided by router-dom
      ...props
    }: IRouterLinkProps & { navigate: unknown },
    ref
  ): ReactElement {
    return <Component {...{ ...props, ref }} />;
  });

  const linkProps: LinkProps = {
    ...props,
    to: href,
    component: Link,
  };

  return <RouterDomLink {...linkProps} ref={ref} />;
});
