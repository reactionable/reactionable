import type { Meta, StoryObj } from "@storybook/react-vite";

import { UIContextProvider, useUIProviderProps } from "../ui/UI";
import { QueryWrapper } from "./QueryWrapper";

const meta: Meta<typeof QueryWrapper> = {
  title: "Core/Components/Query/QueryWrapper",
  component: QueryWrapper,
};

export default meta;

type IData = { content: string };

type Story = StoryObj<typeof QueryWrapper<IData>>;

export const BasicQueryWrapper: Story = {
  args: {
    data: { content: "This is the data content" },
    noData: <>There is not data</>,
    loading: false,
  },
  argTypes: {
    error: {
      control: {
        type: "boolean",
      },
      mapping: {
        true: new Error("An error has occured"),
        false: undefined,
      },
    },
  },
  render: (props) => (
    <UIContextProvider {...useUIProviderProps()}>
      <h3>Query result</h3>
      <QueryWrapper<IData> {...props}>
        {({ data }) => {
          return <p>{data && data.content}</p>;
        }}
      </QueryWrapper>
    </UIContextProvider>
  ),
};
