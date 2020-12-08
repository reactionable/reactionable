import React, { ReactElement, lazy } from "react";

import { useUIProviderProps } from "../ui/UI";
import { App } from "./App";

export default {
  title: "Core/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

export const BasicApp = (): ReactElement => <App ui={useUIProviderProps()} />;

const HomeFromRoute = () => <div>Home from route</div>;
const HomeComponent = lazy(async () => ({ default: HomeFromRoute }));
export const AppWithRoutes = (): ReactElement => (
  <App ui={useUIProviderProps()} routes={[{ component: HomeComponent, exact: true, path: "/" }]} />
);

const HomeAsChildren = () => <div>Home as children</div>;
export const AppWithChildren = (): ReactElement => (
  <App ui={useUIProviderProps()}>
    <HomeAsChildren />
  </App>
);
