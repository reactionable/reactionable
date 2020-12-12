import { ReactElement } from "react";

import { RouterContextProvider, useRouterProviderProps } from "../../router/Router";
import { Link, useLink } from "./Link";

export default {
  title: "Core/Components/UI/Link",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Link,
  },
};

export const BasicLink = (): ReactElement => {
  return (
    <RouterContextProvider {...useRouterProviderProps()}>
      <Link href="/test">test</Link>
    </RouterContextProvider>
  );
};

export const UseLink = (): ReactElement => {
  return useLink({
    href: "/test",
    children: "test",
  });
};
