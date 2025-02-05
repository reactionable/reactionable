import type { Meta, StoryObj } from "@storybook/react";
import { useIdentityProviderProps } from "../identity/Identity";
import { useRouterProviderProps } from "../router/useRouterProviderProps";
import { useUIProviderProps } from "../ui/UI";
import { App } from "./App";

const meta: Meta<typeof App> = {
  title: "Core/Components/App",
  component: App,
};

export default meta;

type Story = StoryObj<typeof App>;

export const BasicApp: Story = {};

const Home = () => <div>Home</div>;

export const AppWithChildren: Story = {
  args: {
    children: <Home />,
  },
};

export const AppWithProviders: Story = {
  args: {
    ui: useUIProviderProps(),
    identity: useIdentityProviderProps(),
    router: useRouterProviderProps(),
  },
};
