import { renderHook, waitFor } from "@testing-library/react";
import { GraphQLAPI } from "@aws-amplify/api-graphql";

import { IData, IVariables } from "./Query";
import { useQuery } from "./useQuery";

type ITestData = IData;

type ITestVariables = IVariables;

const testQuery = `query Test() {
    test() { }
}`;

describe("useQuery", () => {
  it("should render without crashing", async () => {
    const graphqlSpy = jest.spyOn(GraphQLAPI, "graphql");
    graphqlSpy.mockResolvedValueOnce({ data: { test: {} } } as unknown as { data: ITestData });

    const { result } = renderHook(() => useQuery<ITestData, ITestVariables>(testQuery));
    expect(result).toBeTruthy();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    graphqlSpy.mockRestore();
  });
});
