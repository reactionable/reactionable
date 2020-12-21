import { render } from "@testing-library/react";

import { i18nTestInstance } from "../testing/I18n";
import { UIContextProvider, useUIContext, useUIProviderProps } from "./UI";

describe("UI", () => {
  beforeAll(i18nTestInstance);
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
