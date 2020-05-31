import { GraphQLResult, graphqlOperation, GraphQLAPI } from '@aws-amplify/api-graphql';
import {
  IUseQueryOptions as ICoreUseQueryOptions,
  useQuery as coreUseQuery,
  IUseQueryResult,
  IQueryOptions as ICoreQueryOptions,
} from '@reactionable/core';

function isGraphQLResult(arg: any): arg is GraphQLResult {
  return arg.data !== undefined;
}

function extractData<Data>(result: any): Data | undefined {
  const data = result[Object.keys(result)[0]];
  return data as Data | undefined;
}

export type IQueryOptions<Variables extends {}> = ICoreQueryOptions<Variables> & {
  query: string;
  rawData?: boolean;
};

export async function query<Data extends {}, QO extends IQueryOptions<any>>({
  query,
  variables,
  rawData,
}: QO): Promise<Data> {
  const result = await GraphQLAPI.graphql(graphqlOperation(query, variables));

  if (!result || !isGraphQLResult(result) || !result.data) {
    throw new Error('No data');
  }

  if (rawData) {
    return (result.data as unknown) as Data;
  }

  const data = extractData<Data>(result.data);
  if (!data) {
    throw new Error('No data');
  }

  return data;
}

export const mutation = async <Data extends {}, Variables extends {}>(
  options: IQueryOptions<Variables>
) => query<Data, IQueryOptions<Variables>>(options);

export type IUseQueryOptions<Data extends {}, Variables extends {}> = Omit<
  ICoreUseQueryOptions<Data, IQueryOptions<Variables>>,
  'handleQuery'
>;

export const useQuery = <Data extends {}, Variables extends {}>(
  options: IUseQueryOptions<Data, Variables>
): IUseQueryResult<Data> => {
  return coreUseQuery<Data, IQueryOptions<Variables>>({
    ...options,
    handleQuery: (queryOptions: IQueryOptions<Variables>) =>
      query<Data, IQueryOptions<Variables>>(queryOptions),
  });
};
