import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { IData, IVariables } from "./Query";
import { useQuery } from "./useQuery";

type ITestData = IData;

type ITestVariables = IVariables;

const testQuery = `query Test() {
    test() { }
}`;

describe("useQuery", () => {
  it("should render without crashing", async () => {
    await act(() => {
      const { result } = renderHook(() => useQuery<ITestData, ITestVariables>(testQuery));
      expect(result).toBeTruthy();
    });
  });
});
