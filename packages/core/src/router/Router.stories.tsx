import React, { ReactElement } from "react";

import { Link } from "./Link";
import { RouterContextProvider, useRouterProviderProps } from "./Router";

export default {
  title: "Core/Components/Router",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    subcomponent: [RouterContextProvider, Link],
  },
};

export const BasicRouterContextProvider = (): ReactElement => {
  return <RouterContextProvider {...useRouterProviderProps()}>test</RouterContextProvider>;
};

export const BasicLink = (): ReactElement => {
  return <Link href="#">Basic Link</Link>;
};
