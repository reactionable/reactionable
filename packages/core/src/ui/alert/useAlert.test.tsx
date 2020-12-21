import { act, renderHook } from "@testing-library/react-hooks";

import { i18nTestInstance } from "../../testing/I18n";
import { useAlert } from "./useAlert";

describe("useAlert", () => {
  beforeAll(i18nTestInstance);

  it("should render without alert message by default", () => {
    const { result } = renderHook(() => useAlert());

    expect(result.current.alert).toBeNull();
  });

  it("should display an alert alert message when it is defined", () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.setAlert("test");
    });

    expect(result.current.alert).not.toBeNull();
  });
});
