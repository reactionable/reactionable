import { GraphQLAPI, GraphQLResult, graphqlOperation } from '@aws-amplify/api-graphql';
import {
  IQueryOptions as ICoreQueryOptions,
  IUseQueryOptions as ICoreUseQueryOptions,
  IUseQueryResult,
  IVariables,
  useQuery as coreUseQuery,
} from '@reactionable/core';

function isGraphQLResult(arg: any): arg is GraphQLResult {
  return arg.data !== undefined || arg.errors !== undefined;
}

function extractData<Data>(result: any): Data | undefined {
  const data = result[Object.keys(result)[0]];
  return data as Data | undefined;
}

export type IQueryOptions<Variables extends IVariables> = ICoreQueryOptions<Variables> & {
  query: string;
  rawData?: boolean;
};

export async function query<Data extends {}, QO extends IQueryOptions<any>>({
  query,
  variables,
  rawData,
}: QO): Promise<Data> {
  let result;
  try {
    result = await GraphQLAPI.graphql(graphqlOperation(query, variables));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    if (!isGraphQLResult(error) || !error.errors) {
      throw new Error('An unexpected error occurred');
    }

    // TODO: types will be fixed: https://github.com/aws-amplify/amplify-js/pull/5994
    const errors = error.errors;
    throw new Error(errors.map((errorItem: any) => errorItem.message).join(', '));
  }

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

export const mutation = async <Data extends {}, Variables extends IVariables>(
  options: IQueryOptions<Variables>
) => query<Data, IQueryOptions<Variables>>(options);

export type IUseQueryOptions<Data extends {}, Variables extends IVariables> = Omit<
  ICoreUseQueryOptions<Data, IQueryOptions<Variables>>,
  'handleQuery'
>;

export const useQuery = <Data extends {}, Variables extends IVariables>(
  options: IUseQueryOptions<Data, Variables>
): IUseQueryResult<Data> => {
  return coreUseQuery<Data, IQueryOptions<Variables>>({
    ...options,
    handleQuery: (queryOptions: IQueryOptions<Variables>) =>
      query<Data, IQueryOptions<Variables>>(queryOptions),
  });
};
