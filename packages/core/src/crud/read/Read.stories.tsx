import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { Read } from "./Read";

const meta: Meta<typeof Read> = {
  title: "Core/Components/Crud/Read",
  component: Read,
};

export default meta;

type TestData = { id: string; label: string };
type Story = StoryObj<typeof Read<TestData>>;

export const BasicRead: Story = {
  args: {
    loading: false,
    data: { id: "1", label: "Data 1" },
    noData: "No data available",
    refetch: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      action("Data refetched");
    },
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
  render: (props) => {
    return (
      <UIContextProvider {...useUIProviderProps()}>
        <Read {...props}>
          {({ data }) => (
            <ul>
              <li>ID: {data.id}</li>
              <li>Label: {data.label}</li>
            </ul>
          )}
        </Read>
      </UIContextProvider>
    );
  },
};
