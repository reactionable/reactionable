import { App } from "@reactionable/core/lib/app/App";
import { NotFound } from "@reactionable/core/lib/ui/layout/not-found/NotFound";
import { ReactElement, lazy } from "react";

import { useRouterProviderProps } from "../router/Router";

export default {
  title: "Router Dom/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

const Home = () => <div>Home</div>;
const HomeComponent = lazy(async () => ({ default: Home }));

export const AppWithHomeComponent = (): ReactElement => (
  <App
    router={useRouterProviderProps({
      HomeComponent,
    })}
  />
);

const NotFoundComponent = lazy(async () => ({ default: NotFound }));
export const AppWithNotFoundComponent = (): ReactElement => (
  <App
    router={useRouterProviderProps({
      NotFoundComponent,
    })}
  />
);

export const AppWithRoutes = (): ReactElement => (
  <App
    router={useRouterProviderProps({
      routes: [{ path: "/", component: HomeComponent }],
    })}
  />
);
