import React, { ReactElement } from "react";

import { App } from "./App";
import { useUIProviderProps } from "../ui/UI";

export default {
  title: "Core/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

export const BasicApp = (): ReactElement => <App ui={useUIProviderProps()} routes={[]} />;
