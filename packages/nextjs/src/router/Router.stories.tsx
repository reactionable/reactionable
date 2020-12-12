import { ReactElement, forwardRef } from "react";

import { TestWrapper } from "../tests/TestWrapper";
import { RouterContextProvider, useRouter } from "./Router";
import { RouterLink } from "./RouterLink";

export default {
  title: "NextJS/Components/Router",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    subcomponent: [RouterContextProvider, RouterLink, useRouter],
  },
};

export const BasicRouterContextProvider = (): ReactElement => {
  return <RouterContextProvider>test</RouterContextProvider>;
};

export const BasicRouterLink = (): ReactElement => {
  return (
    <TestWrapper>
      <RouterLink href="test">test</RouterLink>
    </TestWrapper>
  );
};

export const RouterLinkCustomComponent = (): ReactElement => {
  const CustomComponent = forwardRef<HTMLAnchorElement>(({ children, ...props }, ref) => (
    <a ref={ref} {...props} className="custom-component">
      <b>{children}</b>
    </a>
  ));
  CustomComponent.displayName = "CustomComponent";

  return (
    <TestWrapper>
      <RouterLink href="test" Component={CustomComponent}>
        test
      </RouterLink>
    </TestWrapper>
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
