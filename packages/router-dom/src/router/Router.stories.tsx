import { ReactElement, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterComponent } from "./RouterComponent";
import { useRouter } from "./useRouter";
import { RouterContextProvider } from "./useRouterContext";

export default {
  title: "Router DOM/Components/Router",
  parameters: {
    component: RouterComponent,
    subcomponent: [RouterContextProvider, useRouter],
  },
};

const IndexComponent = lazy(() => Promise.resolve({ default: () => <>Index route</> }));

export const BasicRouterContextProvider = (): ReactElement => {
  return (
    <RouterContextProvider>
      <Routes>
        <Route path="/" element={<IndexComponent />} />
      </Routes>
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
