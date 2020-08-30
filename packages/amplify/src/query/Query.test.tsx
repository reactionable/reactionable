import { GraphQLAPI } from '@aws-amplify/api-graphql';

import { IQueryOptions, query } from './Query';

type ITestData = {};

type TestVariables = {};

const testQuery = `query Test() {
    test() { }
}`;

const graphqlMock = GraphQLAPI.graphql as jest.MockedFunction<typeof GraphQLAPI.graphql>;

describe('Query', () => {
  beforeEach(() => {
    graphqlMock.mockReset();
  });

  describe('query', () => {
    it('should return the retrieve graphql error', async () => {
      const expectedError = 'test graphql error';
      graphqlMock.mockRejectedValueOnce({
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

      await expect(queryOperation).rejects.toThrowError(new Error(expectedError));
    });
  });
});
