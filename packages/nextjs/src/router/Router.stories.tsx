import { ReactElement } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterContextProvider } from "./useRouterContext";
import { useRouter } from "./useRouter";

export default {
  title: "NextJS/Components/Router",
  parameters: {
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
