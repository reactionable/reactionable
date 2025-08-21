import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { ListTable } from "./ListTable";

const meta: Meta<typeof ListTable> = {
  title: "Core/Components/Crud/List/Table",
  component: ListTable,
};

export default meta;

type TestData = { id: string; label: string };
type Story = StoryObj<typeof ListTable<TestData>>;

export const BasicListTable: Story = {
  args: {
    head: ["ID", "Label"],
    data: {
      count: 2,
      items: [
        { id: "1", label: "Data 1" },
        { id: "2", label: "Data 2" },
      ],
    },
    refetch: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      action("Data refetched");
    },
  },
  argTypes: {
    loading: {
      control: {
        type: "boolean",
      },
    },
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
      <ListTable {...props}>
        {(data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.label}</td>
          </tr>
        )}
      </ListTable>
    </UIContextProvider>
  ),
};
