import { act, renderHook } from "@testing-library/react-hooks";

import { i18nTestInstance } from "../../tests/I18n";
import { useLoader } from "./useLoader";

describe("useLoader", () => {
  beforeAll(i18nTestInstance);

  it("should render unloading by default", () => {
    const { result } = renderHook(() => useLoader());

    expect(result.current.loading).toEqual(false);
    expect(result.current.loader).toBeNull();
  });

  it("should display loader state when loading is true", () => {
    const { result } = renderHook(() => useLoader());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toEqual(true);
    expect(result.current.loader).not.toBeNull();
  });
});
