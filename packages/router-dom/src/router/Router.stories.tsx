import type { Meta, StoryObj } from "@storybook/react";
import { lazy } from "react";

import { TestWrapper } from "../testing/TestWrapper";
import { useRouter } from "./useRouter";
import { RouterContextProvider, useRouterContext } from "./useRouterContext";

const meta: Meta = {
  title: "Router DOM/Components/Router",
  component: RouterContextProvider,
};

export default meta;

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

export const BasicRouterContextProvider: StoryObj<typeof RouterContextProvider> = {
  args: {
    children: <RoutesComponent />,
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
