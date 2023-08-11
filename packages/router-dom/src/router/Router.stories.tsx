import { ReactElement, lazy } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterComponent } from "./RouterComponent";
import { useRouter } from "./useRouter";
import { RouterContextProvider, useRouterContext } from "./useRouterContext";

export default {
  title: "Router DOM/Components/Router",
  parameters: {
    component: RouterComponent,
    subcomponent: [RouterContextProvider, useRouter],
  },
};

const LazyTestComponent = lazy(() => Promise.resolve({ default: () => <>Test Component</> }));

const RoutesComponent = () => {
  const { renderRoutes } = useRouterContext();

  return renderRoutes([
    {
      path: "/",
      component: LazyTestComponent,
    },
    {
      path: "/private",
      component: LazyTestComponent,
      privateRoute: true,
    },
  ]);
};

export const BasicRouterContextProvider = (): ReactElement => {
  return (
    <RouterContextProvider>
      <RoutesComponent />
    </RouterContextProvider>
  );
};

export const UseRouter = (): ReactElement => {
  const RouterInfos = () => {
    const router = useRouter();
    return (
      <dl>
        <dt>Match</dt>
        <dd>
          <code>
            <pre>{JSON.stringify(router.match, null, 2)}</pre>
          </code>
        </dd>
      </dl>
    );
  };

  return (
    <TestWrapper>
      <RouterInfos />
    </TestWrapper>
  );
};
