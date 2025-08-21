import type { Meta, StoryObj } from "@storybook/react-vite";

import { useRouterProviderProps } from "../../router/useRouterProviderProps";
import { RouterContextProvider } from "../../router/useRouterContext";
import { Link, useLink } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Core/Components/UI/Link",
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const BasicLink: Story = {
  args: {
    href: "/test",
    children: "Test",
  },
  render: (props) => (
    <RouterContextProvider {...useRouterProviderProps()}>
      <Link {...props} />
    </RouterContextProvider>
  ),
};

export const UseLink: StoryObj<typeof useLink> = {
  args: {
    href: "/test",
    children: "Test",
  },
  render: (props) => useLink(props),
};
