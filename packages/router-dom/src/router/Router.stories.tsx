import React, { ReactElement } from "react";
import { TestWrapper } from "../tests/TestWrapper";

import { RouterContextProvider, useRouterProviderProps } from "./Router";
import { RouterLink } from "./RouterLink";

export default {
  title: "Router Dom/Components/Router",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    subcomponent: [RouterContextProvider, RouterLink],
  },
};

export const BasicRouterContextProvider = (): ReactElement => {
  return <RouterContextProvider {...useRouterProviderProps()}>test</RouterContextProvider>;
};

export const BasicRouterLink = (): ReactElement => {
  return (
    <TestWrapper>
      <RouterLink href="test">
        <a>test</a>
      </RouterLink>
    </TestWrapper>
  );
};
