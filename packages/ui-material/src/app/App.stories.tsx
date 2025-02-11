import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { App } from "@reactionable/core";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactElement } from "react";

import { useUIProviderProps } from "../UI";

const meta: Meta = {
  title: "UI Material/Components/App",
  component: App,
};

export default meta;

type Story = StoryObj<typeof App>;

const Home = (): ReactElement => (
  <Paper elevation={3}>
    <h1>Hello, world!</h1>
    <p>
      <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
      <b>Lorem Ipsum</b> has been the industry&apos; standard dummy text ever since the 1500s, when
      an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
      survived not only five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
      containing <b>Lorem Ipsum</b> passages, and more recently with desktop publishing software
      like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
    </p>
    <p>
      <Button color="primary">Learn more</Button>
    </p>
  </Paper>
);

export const AppWithProviders: Story = {
  args: {
    ui: useUIProviderProps(),
    children: <Home />,
  },
};
