import { useLink } from "@reactionable/core";
import { App } from "@reactionable/core/lib/app/App";
import { NotFound } from "@reactionable/core/lib/ui/layout/not-found/NotFound";
import { ReactElement, lazy } from "react";

import { useRouterProviderProps } from "../router/Router";

export default {
  title: "Router Dom/Components/App",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: App },
};

export const BasicApp = (): ReactElement => {
  const Home = () => <div>Home</div>;
  const HomeComponent = lazy(async () => ({ default: Home }));

  const NotFoundComponent = lazy(async () => ({ default: NotFound }));

  return (
    <App
      router={useRouterProviderProps({
        HomeComponent,
        NotFoundComponent,
      })}
    />
  );
};

export const AppWithCustomRoutes = (): ReactElement => {
  const CustomRouteHome = () => {
    const linkToCustomRoute = useLink({
      href: "/custom-route",
      children: "Go to custom route",
    });
    return (
      <div>
        <h1>Home</h1>
        <p>{linkToCustomRoute}</p>
      </div>
    );
  };
  const CustomRouteHomeComponent = lazy(async () => ({ default: CustomRouteHome }));

  const CustomRoutePage = () => <div>Custom route page</div>;
  const CustomRoutePageComponent = lazy(async () => ({ default: CustomRoutePage }));

  const NotFoundComponent = lazy(async () => ({ default: NotFound }));

  return (
    <App
      router={useRouterProviderProps({
        HomeComponent: CustomRouteHomeComponent,
        NotFoundComponent,
        routes: [{ path: "/custom-route", component: CustomRoutePageComponent }],
      })}
    />
  );
};
