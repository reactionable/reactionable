import type { Meta, StoryObj } from "@storybook/react";
import { ILinkProps, LinkAnchor, useUIContext } from "@reactionable/core";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterLink } from "./RouterLink";

const meta: Meta<typeof RouterLink> = {
  title: "Router DOM/Components/Router/RouterLink",
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
    const CustomComponent = ({ children, ...props }: ILinkProps) => (
      <a {...props} className="custom-component">
        <b>{children}</b>
      </a>
    );

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
