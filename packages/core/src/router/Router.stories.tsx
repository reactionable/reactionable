import type { Meta, StoryObj } from "@storybook/react-vite";

import { useRouterProviderProps } from "./useRouterProviderProps";
import { RouterContextProvider } from "./useRouterContext";
import { useRouter } from "./useRouter";
const meta: Meta = {
  title: "Core/Components/Router",
  component: RouterContextProvider,
};

export default meta;

export const BasicRouterContextProvider: StoryObj<typeof RouterContextProvider> = {
  args: {
    children: "test",
  },
  render: ({ children, ...props }) => (
    <RouterContextProvider {...useRouterProviderProps({ ...props })}>
      {children}
    </RouterContextProvider>
  ),
};

export const UseRouter: StoryObj<typeof useRouter> = {
  render: () => {
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
  },
};
