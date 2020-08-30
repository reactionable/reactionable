import { GraphQLAPI } from '@aws-amplify/api-graphql';
import { act, renderHook } from '@testing-library/react-hooks';

import { queryList, useQueryList } from './QueryList';

type IItemData = {
  id: string;
  label: string;
};

type ListItemsQueryVariables = {
  filter?: {} | null;
  limit?: number | null;
  nextToken?: string | null;
};

const listItems = `query ListItems($filter: ModelImageFilterInput, $limit: Int, $nextToken: String) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
            id
            label
        }
        nextToken
    }
}`;

const graphqlMock = GraphQLAPI.graphql as jest.MockedFunction<typeof GraphQLAPI.graphql>;

describe('QueryList', () => {
  // Load first page
  const expectedItems = [
    { id: '1', label: 'item 1' },
    { id: '2', label: 'item 2' },
  ];
  const nextToken = 'test-next-token';

  beforeEach(() => {
    graphqlMock.mockReset();
  });

  describe('queryList', () => {
    it('should query all items', async () => {
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken } },
      });
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken } },
      });
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken: null } },
      });

      const result = await queryList<IItemData, ListItemsQueryVariables>({
        query: listItems,
        queryAll: true,
      });

      expect(result.items).toEqual([...expectedItems, ...expectedItems, ...expectedItems]);

      expect(graphqlMock).toHaveBeenCalledWith({ query: listItems, variables: {} });
      expect(graphqlMock).toHaveBeenCalledWith({ query: listItems, variables: { nextToken } });
      expect(graphqlMock).toHaveBeenCalledWith({ query: listItems, variables: { nextToken } });
    });

    it('should query expected items limit', async () => {
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken } },
      });
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken } },
      });
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken: null } },
      });

      const variables = { limit: 3 };

      const result = await queryList<IItemData, ListItemsQueryVariables>({
        query: listItems,
        variables,
      });

      expect(result.items).toEqual([...expectedItems, ...expectedItems]);

      expect(graphqlMock).toHaveBeenCalledWith({ query: listItems, variables });
      expect(graphqlMock).toHaveBeenCalledWith({
        query: listItems,
        variables: { ...variables, nextToken },
      });
    });
  });

  describe('useQueryList', () => {
    it('should return an error if graphql result is undefined', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useQueryList<IItemData, ListItemsQueryVariables>({
          query: listItems,
        })
      );

      await act(waitForNextUpdate);

      expect(result.current.error).toEqual(new Error('No data'));
    });

    it('should return graphql result data', async () => {
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken } },
      });

      const { result, waitForNextUpdate } = renderHook(() =>
        useQueryList<IItemData, ListItemsQueryVariables>({ query: listItems })
      );
      await act(waitForNextUpdate);

      expect(graphqlMock).toHaveBeenCalledWith({ query: listItems, variables: {} });

      expect(result.current.error).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.refetch).toBeInstanceOf(Function);
      expect(result.current.data).toEqual(expectedItems);
      expect(result.current.previous).toBeUndefined();
      expect(result.current.next).toBeInstanceOf(Function);
    });

    it('should paginate through items', async () => {
      const nextToken = 'test-next-token';

      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken } },
      });

      const { result, waitForNextUpdate } = renderHook(() =>
        useQueryList<IItemData, ListItemsQueryVariables>({ query: listItems })
      );
      await act(waitForNextUpdate);

      expect(result.current.next).toBeInstanceOf(Function);

      // Load second page
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: [], nextToken: null } },
      });

      await act(() => {
        result.current.next && result.current.next();
        return waitForNextUpdate();
      });

      expect(graphqlMock).toHaveBeenCalledWith({ query: listItems, variables: { nextToken } });
      expect(result.current.next).toBeUndefined();
      expect(result.current.previous).toBeInstanceOf(Function);
      expect(result.current.data).toEqual([]);

      // Return to first page
      graphqlMock.mockResolvedValueOnce({
        data: { listItems: { items: expectedItems, nextToken } },
      });

      await act(() => {
        result.current.previous && result.current.previous();
        return waitForNextUpdate();
      });

      expect(graphqlMock).toHaveBeenCalledWith({ query: listItems, variables: {} });
      expect(result.current.previous).toBeUndefined();
      expect(result.current.next).toBeInstanceOf(Function);
      expect(result.current.data).toEqual(expectedItems);
    });
  });
});
