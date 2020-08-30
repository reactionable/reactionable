import './config';

import { List, UIContextProvider } from '@reactionable/core';
import React from 'react';

import { useQueryList } from '../src/query/QueryList';

export default {
  title: 'Amplify/Query',
  parameters: { info: { inline: true } },
};

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
  listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      label
    }
    nextToken
  }
}`;

export const UseQueryList = () => {
  const ListItems = () => {
    const { isLoading, error, data, refetch, next, previous } = useQueryList<
      IItemData,
      ListItemsQueryVariables
    >({
      query: listItems,
    });

    const renderChildren = (data: IItemData[]) => {
      return (
        <table>
          {data.map((item) => (
            <tr key={'item-' + item.id}>
              <td>{item.label}</td>
            </tr>
          ))}
        </table>
      );
    };

    return (
      <>
        <h1>List items</h1>
        <button onClick={refetch}>Refetch</button>
        {previous && (
          <button onClick={previous} disabled={!previous}>
            Previous
          </button>
        )}
        {next && (
          <button onClick={next} disabled={!next}>
            Next
          </button>
        )}
        <hr />
        <List<IItemData>
          error={error}
          data={data}
          isLoading={isLoading}
          children={renderChildren}
          noData="There is no existing item"
        />
      </>
    );
  };

  return (
    <UIContextProvider>
      <ListItems />
    </UIContextProvider>
  );
};
