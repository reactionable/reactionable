import "../../stories/config";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Loader, useLoader } from "./Loader";

const meta: Meta<typeof Loader> = {
  title: "UI Bootstrap/Components/Loader",
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const BasicLoader: Story = {
  args: {
    overlay: false,
  },
};

export const UseLoader: StoryObj<typeof useLoader> = {
  args: {
    overlay: false,
    loading: true,
  },
  render: (props) => {
    const { loader } = useLoader({
      ...props,
    });

    return <>{loader}</>;
  },
};
