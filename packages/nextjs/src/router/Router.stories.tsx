import type { Meta, StoryObj } from "@storybook/react-vite";

import { TestWrapper } from "../testing/TestWrapper";
import { RouterContextProvider } from "./useRouterContext";
import { useRouter } from "./useRouter";

const meta: Meta = {
  title: "NextJS/Components/Router",
  component: RouterContextProvider,
};

export default meta;

export const BasicRouterContextProvider: StoryObj<typeof RouterContextProvider> = {
  args: {
    children: "test",
  },
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
      <TestWrapper>
        <RouterInfos />
      </TestWrapper>
    );
  },
};
