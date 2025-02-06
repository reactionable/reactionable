import { TableCell, TableRow } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { UIContextProvider } from "../../UI";
import { ListTable } from "./ListTable";

const meta: Meta<typeof ListTable> = {
  title: "UI Material/Components/Crud/List/Table",
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
    <UIContextProvider>
      <ListTable {...props}>
        {(data) => (
          <TableRow key={data.id}>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.label}</TableCell>
          </TableRow>
        )}
      </ListTable>
    </UIContextProvider>
  ),
};
