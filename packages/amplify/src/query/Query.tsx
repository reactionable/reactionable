import { GraphQLAPI, GraphQLResult, graphqlOperation } from "@aws-amplify/api-graphql";
import {
  IQueryOptions as ICoreQueryOptions,
  IVariables as ICoreVariables,
} from "@reactionable/core";

// Required by amplify
export type IData = object;
export type IVariables = ICoreVariables;

function isGraphQLResult(arg: unknown): arg is GraphQLResult {
  return arg !== null && typeof arg === "object" && ("data" in arg || "errors" in arg);
}

function extractData<Data>(result: IData): Data | undefined {
  const resultKeys = Object.keys(result) as Array<keyof IData>;
  if (resultKeys.length !== 1) {
    return undefined;
  }

  const data = result[resultKeys[0]];
  return data as Data | undefined;
}

export type IQueryOptions<Variables extends IVariables> = ICoreQueryOptions<Variables> & {
  query: string;
  rawData?: boolean;
};

export async function query<Data extends IData, QO extends IQueryOptions<IVariables>>({
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
      throw new Error("An unexpected error occurred");
    }

    throw new Error(error.errors.map((errorItem) => errorItem.message).join(", "));
  }

  if (!result || !isGraphQLResult(result) || !result.data) {
    throw new Error("No data");
  }

  if (rawData) {
    return result.data as unknown as Data;
  }

  const data = extractData<Data>(result.data as IData);
  if (!data) {
    throw new Error("No data");
  }

  return data;
}
