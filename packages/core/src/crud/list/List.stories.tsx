import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import { UIContextProvider, useUIProviderProps } from "../../ui/UI";
import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Core/Components/Crud/List",
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
    <UIContextProvider {...useUIProviderProps()}>
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
