import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { UIContextProvider, useUIProviderProps } from "../ui/UI";
import { QueryWrapper } from "./QueryWrapper";

export default {
  title: "Core/Components/Query/QueryWrapper",
  parameters: { info: { inline: true }, component: QueryWrapper },
  options: { showPanel: true },
  decorators: [withKnobs],
};

export const BasicQueryWrapper = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  const hasData = boolean("Has data?", false);
  const content = text("Content", "This is the data content");

  return (
    <UIContextProvider {...useUIProviderProps()}>
      <h3>Query result</h3>
      <QueryWrapper<{ content: string }>
        loading={loading}
        error={hasError ? new Error("An error has occured") : undefined}
        data={hasData ? { content } : undefined}
        noData={<>There is not data</>}
      >
        {({ data }) => {
          return <p>{data && data.content}</p>;
        }}
      </QueryWrapper>
    </UIContextProvider>
  );
};
