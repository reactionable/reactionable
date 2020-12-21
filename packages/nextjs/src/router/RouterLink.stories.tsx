import { LinkAnchor } from "@reactionable/core/lib/ui/link/Link";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterLink } from "./RouterLink";

export default {
  title: "NextJs/Components/Router/RouterLink",
  parameters: { component: RouterLink },
};

export const BasicRouterLink = (): ReactElement => {
  return (
    <TestWrapper>
      <RouterLink href="test" Component={LinkAnchor}>
        test
      </RouterLink>
    </TestWrapper>
  );
};

export const RouterLinkCustomComponent = (): ReactElement => {
  const CustomComponent = forwardRef(function CustomComponent(
    {
      children,
      ...props
    }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) {
    return (
      <a {...props} className="custom-component" ref={ref}>
        <b>{children}</b>
      </a>
    );
  });

  return (
    <TestWrapper>
      <RouterLink href="test" Component={CustomComponent}>
        test
      </RouterLink>
    </TestWrapper>
  );
};

export const BasicLinkInRouterLink = (): ReactElement => {
  const LinkComponent = () => {
    return useUIContext().useLink({
      children: "test",
      href: "/test",
    });
  };

  return (
    <TestWrapper>
      <LinkComponent />
    </TestWrapper>
  );
};

export const RouterLinkCustomComponentInRouterLink = (): ReactElement => {
  const CustomComponent = forwardRef(function CustomComponent(
    {
      children,
      ...props
    }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) {
    return (
      <a {...props} className="custom-component" ref={ref}>
        <b>{children}</b>
      </a>
    );
  });

  const LinkComponent = () => {
    return useUIContext().useLink({
      children: "test",
      href: "/test",
      Component: CustomComponent,
    });
  };

  return (
    <TestWrapper>
      <LinkComponent />
    </TestWrapper>
  );
};
