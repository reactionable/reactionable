import "../config";

import { action } from "@storybook/addon-actions";
import { number, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { Paginator } from "../../src/paginator/Paginator";

export default {
  title: "UI Bootstrap/Components/Paginator",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Paginator,
  },
  decorators: [withKnobs],
};

export const SimplePaginator = (): ReactElement => {
  const currentPage = number("Current page", 2);
  const totalCount = number("Total count", 10);
  const perPage = number("Per page", 2);
  const pageRangeDisplayed = number("Page range displayed", 2);
  const marginPagesDisplayed = number("Margin pages displayed", 2);
  const onChange = action(`Page changed`);

  return (
    <Paginator
      currentPage={currentPage}
      totalCount={totalCount}
      perPage={perPage}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onChange={onChange}
    />
  );
};
