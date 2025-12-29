import { GraphQLAPI } from "@aws-amplify/api-graphql";

import { IData, IQueryOptions, IVariables, query } from "./Query";

type ITestData = IData;

type TestVariables = IVariables;

const testQuery = `query Test() {
    test() { }
}`;

const graphqlSpy = jest.spyOn(GraphQLAPI, "graphql");

describe("Query", () => {
  beforeEach(() => {
    graphqlSpy.mockReset();
  });

  describe("query", () => {
    it("should return the retrieve graphql error", async () => {
      const expectedError = "test graphql error";
      graphqlSpy.mockRejectedValueOnce({
        data: undefined,
        errors: [
          {
            path: null,
            locations: null,
            message: expectedError,
          },
        ],
      });

      const queryOperation = query<ITestData, IQueryOptions<TestVariables>>({
        query: testQuery,
      });

      await expect(queryOperation).rejects.toThrow(new Error(expectedError));
    });
  });
});
