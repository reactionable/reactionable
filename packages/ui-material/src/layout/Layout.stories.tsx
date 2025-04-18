import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import type { Meta, StoryObj } from "@storybook/react";

import { Layout, useLayout } from "./Layout";

const meta: Meta<typeof Layout> = {
  title: "UI Material/Components/Layout",
  component: Layout,
};

export default meta;

type Story = StoryObj<typeof Layout>;

const LayoutContent = () => (
  <Paper elevation={3}>
    <Box p={2}>
      <h1>Hello, world!</h1>
      <p>
        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
        <b>Lorem Ipsum</b> has been the industry&apos; standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
      </p>
      <p>
        <Button color="primary">Learn more</Button>
      </p>
    </Box>
  </Paper>
);

export const BasicLayout: Story = {
  args: {
    children: <LayoutContent />,
  },
};

export const LayoutWithHeader: Story = {
  args: {
    children: <LayoutContent />,
    header: { brand: "My App" },
  },
};

export const LayoutWithFooter: Story = {
  args: {
    children: <LayoutContent />,
    footer: { brand: "My App" },
  },
};

export const LayoutWithHeaderAndFooter: Story = {
  args: {
    children: <LayoutContent />,
    header: { brand: "My App" },
    footer: { brand: "My App" },
  },
};

export const UseLayout: StoryObj<typeof useLayout> = {
  args: {
    children: <LayoutContent />,
    header: { brand: "My App" },
  },
  render: (props) => useLayout(props),
};
