import type { Meta, StoryObj } from "@storybook/react-vite";

import { Loader } from "./Loader";
import { IUseLoaderProps, useLoader } from "./useLoader";

const meta: Meta<typeof Loader> = {
  title: "Core/Components/UI/Loader",
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const BasicLoader: Story = {};

export const UseLoader: StoryObj<IUseLoaderProps> = {
  args: {
    loading: true,
  },
  render: (props) => {
    const { loader } = useLoader({
      ...props,
    });

    return <>{loader}</>;
  },
};
