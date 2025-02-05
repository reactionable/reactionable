import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import { i18nTestInstance, useUIContext } from "@reactionable/core";
import { render } from "@testing-library/react";

import { UIContextProvider, useUIProviderProps } from "./UI";
import * as stories from "./UI.stories";

const { BasicUIContextProvider } = composeStories(stories);

describe("UI", () => {
  beforeAll(i18nTestInstance);

  describe("BasicUIContextProvider", () => {
    it("should render without crashing", () => {
      const result = render(<BasicUIContextProvider />);

      expect(result).toBeTruthy();
    });
  });

  describe("UIContextProvider", () => {
    it("should render without crashing", async () => {
      const result = render(<UIContextProvider {...useUIProviderProps()}>test</UIContextProvider>);
      expect(result).toBeTruthy();
    });

    it("should use UI hook", async () => {
      const TestComponent = () => {
        const { useLoader } = useUIContext();
        const { loader } = useLoader({ loading: true });
        return loader;
      };

      const result = render(
        <UIContextProvider {...useUIProviderProps()}>
          <TestComponent />
        </UIContextProvider>
      );
      expect(result).toBeTruthy();
    });
  });
});
