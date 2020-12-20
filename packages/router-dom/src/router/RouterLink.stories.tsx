import { ILinkProps, LinkAnchor } from "@reactionable/core/lib/ui/link/Link";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";

import { TestWrapper } from "../tests/TestWrapper";
import { RouterLink } from "./RouterLink";

export default {
  title: "Router DOM/Components/Router/RouterLink",
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
  const CustomComponent = ({ children, ...props }: ILinkProps) => (
    <a {...props} className="custom-component">
      <b>{children}</b>
    </a>
  );

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
  const CustomComponent = ({
    children,
    ...props
  }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
    <a {...props} className="custom-component">
      <b>{children}</b>
    </a>
  );

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
