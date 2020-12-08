import React, { ReactElement } from "react";

import { RouterContextProvider, useRouterProviderProps } from "./Router";
import { RouterLink } from "./RouterLink";

export default {
  title: "Core/Components/Router",
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
    <RouterLink href="test">
      <a>test</a>
    </RouterLink>
  );
};
