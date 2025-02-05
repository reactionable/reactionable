import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { Paginator } from "./Paginator";

const meta: Meta<typeof Paginator> = {
  title: "UI Material/Components/Paginator",
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
