import { ReactElement } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterComponent, RouterContextProvider, useRouter } from "./Router";

export default {
  title: "Router DOM/Components/Router",
  parameters: {
    component: RouterComponent,
    subcomponent: [RouterContextProvider, useRouter],
  },
};

export const BasicRouterContextProvider = (): ReactElement => {
  return <RouterContextProvider>test</RouterContextProvider>;
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
