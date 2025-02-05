import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import type { Meta, StoryObj } from "@storybook/react";

import { UIContextProvider } from "./UI";

const meta: Meta<typeof UIContextProvider> = {
  title: "UI Material/Components/UIContextProvider",
  component: UIContextProvider,
};

export default meta;

type Story = StoryObj<typeof UIContextProvider>;

export const BasicUIContextProvider: Story = {
  args: {
    children: (
      <Paper elevation={3}>
        <h1>Hello, world!</h1>
        <p>
          <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
          <b>Lorem Ipsum</b> has been the industry&apos; standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with
          desktop publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
        </p>
        <p>
          <Button color="primary">Learn more</Button>
        </p>
      </Paper>
    ),
  },
};
