import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinkAnchor, useUIContext } from "@reactionable/core";
import { AnchorHTMLAttributes, DetailedHTMLProps, ForwardedRef, forwardRef } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterLink } from "./RouterLink";

const meta: Meta<typeof RouterLink> = {
  title: "NextJs/Components/Router/RouterLink",
  component: RouterLink,
};

export default meta;

type Story = StoryObj<typeof RouterLink>;

export const BasicRouterLink: Story = {
  args: {
    href: "/test",
    children: "Test",
    Component: LinkAnchor,
  },
  render: (props) => {
    return (
      <TestWrapper>
        <RouterLink {...props} />
      </TestWrapper>
    );
  },
};

export const RouterLinkCustomComponent: Story = {
  args: {
    href: "/test",
    children: "Test",
  },
  render: (props) => {
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
        <RouterLink {...props} Component={CustomComponent} />
      </TestWrapper>
    );
  },
};

export const BasicLinkInRouterLink: Story = {
  args: {
    href: "/test",
    children: "Test",
  },
  render: ({ href, children }) => {
    const LinkComponent = () => {
      return useUIContext().useLink({
        children: <>{children}</>,
        href: `${href}`,
      });
    };

    return (
      <TestWrapper>
        <LinkComponent />
      </TestWrapper>
    );
  },
};

export const RouterLinkCustomComponentInRouterLink: Story = {
  args: {
    href: "/test",
    children: "Test",
  },
  render: ({ href, children }) => {
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
        children: <>{children}</>,
        href: `${href}`,
        Component: CustomComponent,
      });
    };

    return (
      <TestWrapper>
        <LinkComponent />
      </TestWrapper>
    );
  },
};
