import "../../stories/config";

import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Paginator } from "./Paginator";

const meta: Meta<typeof Paginator> = {
  title: "UI Bootstrap/Components/Paginator",
  component: Paginator,
};

export default meta;

type Story = StoryObj<typeof Paginator>;

export const BasicPaginator: Story = {
  args: {
    currentPage: 2,
    totalCount: 10,
    perPage: 2,
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 2,
    onChange: action(`Page changed`),
  },
};
