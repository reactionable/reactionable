import "../../../stories/config";

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { UIContextProvider } from "../../UI";
import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "UI Bootstrap/Components/Crud/List",
  component: List,
};

export default meta;

type TestData = { id: string; label: string };
type Story = StoryObj<typeof List<TestData>>;

export const BasicList: Story = {
  args: {
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
      <List {...props}>
        {({ data }) => (
          <ul>
            {data.items.map((item) => (
              <li key={item.id}>
                <dl>
                  <dt>Id</dt>
                  <dd>{item.id}</dd>
                  <dt>Label</dt>
                  <dd>{item.label}</dd>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </List>
    </UIContextProvider>
  ),
};
