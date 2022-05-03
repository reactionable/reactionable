import { ReactElement } from "react";

import { useIdentityProviderProps } from "../identity/Identity";
import { useRouterProviderProps } from "../router/useRouterProviderProps";
import { useUIProviderProps } from "../ui/UI";
import { App } from "./App";

export default {
  title: "Core/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

export const BasicApp = (): ReactElement => <App />;

const Home = () => <div>Home</div>;

export const AppWithChildren = (): ReactElement => (
  <App>
    <Home />
  </App>
);

export const AppWithProviders = (): ReactElement => (
  <App
    ui={useUIProviderProps()}
    identity={useIdentityProviderProps()}
    router={useRouterProviderProps()}
  />
);
