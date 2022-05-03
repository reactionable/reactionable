import { ReactElement } from "react";

import { useRouterProviderProps } from "./useRouterProviderProps";
import { RouterContextProvider } from "./useRouterContext";
import { useRouter } from "./useRouter";

export default {
  title: "Core/Components/Router",
  parameters: {
    subcomponent: [useRouterProviderProps, RouterContextProvider, useRouter],
  },
};

export const BasicRouterContextProvider = (): ReactElement => {
  return <RouterContextProvider {...useRouterProviderProps()}>test</RouterContextProvider>;
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
    <RouterContextProvider {...useRouterProviderProps()}>
      <RouterInfos />
    </RouterContextProvider>
  );
};
