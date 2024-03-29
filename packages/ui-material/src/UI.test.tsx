import "@testing-library/jest-dom";

import createTheme from "@material-ui/core/styles/createTheme";
import useTheme from "@material-ui/core/styles/useTheme";
import { i18nTestInstance } from "@reactionable/core/lib/testing/I18n";
import { useUIContext } from "@reactionable/core/lib/ui/UI";
import { render } from "@testing-library/react";

import { UIContextProvider, useUIProviderProps } from "./UI";

describe("UI", () => {
  beforeAll(i18nTestInstance);
  describe("UIContextProvider", () => {
    it("should render without crashing", async () => {
      const result = render(<UIContextProvider {...useUIProviderProps()}>test</UIContextProvider>);
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
