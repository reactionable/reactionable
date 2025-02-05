import "@testing-library/jest-dom";

import { composeStories } from "@storybook/react";
import createTheme from "@material-ui/core/styles/createTheme";
import useTheme from "@material-ui/core/styles/useTheme";
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

    it("should initialize a theme with given options", async () => {
      const primaryColor = "#FF0000";

      const TestComponent = () => {
        const theme = useTheme();
        return <div data-testid="test-color">{theme.palette.primary.main}</div>;
      };
      const { getByTestId } = render(
        <UIContextProvider
          {...useUIProviderProps()}
          theme={{ palette: { primary: { main: primaryColor } } }}
        >
          <TestComponent />
        </UIContextProvider>
      );

      const testColor = getByTestId("test-color");
      expect(testColor).toBeDefined();
      expect(testColor).toHaveTextContent(primaryColor);
    });

    it("should initialize a theme with a given theme", async () => {
      const primaryColor = "#FF0000";
      const theme = createTheme({ palette: { primary: { main: primaryColor } } });

      const TestComponent = () => {
        const theme = useTheme();
        return <div data-testid="test-color">{theme.palette.primary.main}</div>;
      };
      const { getByTestId } = render(
        <UIContextProvider {...useUIProviderProps()} theme={theme}>
          <TestComponent />
        </UIContextProvider>
      );

      const testColor = getByTestId("test-color");
      expect(testColor).toBeDefined();
      expect(testColor).toHaveTextContent(primaryColor);
    });
  });
});
