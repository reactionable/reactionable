import React from "react";

import { App } from "../../src/app/App";
import { useUIProviderProps } from "../../src/ui/UI";

export default {
  title: "Core/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

export const AppBasic = (): ReactElement => <App ui={useUIProviderProps()} routes={[]} />;
