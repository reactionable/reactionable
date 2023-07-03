import {
  ApolloClient,
  ApolloClientOptions,
  DocumentNode,
  InMemoryCache,
  InMemoryCacheConfig,
} from "@apollo/client";
import { ApolloProvider, OperationVariables, gql, useApolloClient } from "@apollo/client";
import { IData as ICoreData } from "@reactionable/core/lib/query/Query";
import { PropsWithChildren, ReactElement, useMemo } from "react";

import { IGraphqlClientLinkProps, getGraphqlClientLink } from "./ClientLink";
export { gql } from "@apollo/client";

export type IGraphqlClient = ApolloClient<IGraphqlClientState>;

export type IGraphqlClientState = Record<string, unknown>;
export type IGraphqlClientConfig = {
  initialState?: IGraphqlClientState;
  cacheConfig?: InMemoryCacheConfig;
} & IGraphqlClientLinkProps &
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Partial<ApolloClientOptions<any>>;

export type IVariables = OperationVariables;
export type IData = ICoreData;

let graphqlClient: IGraphqlClient | undefined;
function getGraphqlClient() {
  return graphqlClient;
}

function createGraphqlClient({
  uri,
  cacheConfig,
  getAuthorization,
  setContext,
  link,
  ...apolloProps
}: IGraphqlClientConfig) {
  const graphqlClientLink = getGraphqlClientLink({
    uri,
    link,
    getAuthorization,
    setContext,
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: graphqlClientLink,
    cache: new InMemoryCache(cacheConfig),
    ...apolloProps,
  });
}

export function initializeGraphqlClient({
  initialState,
  ...graphqlClientConfig
}: IGraphqlClientConfig): IGraphqlClient {
  const _graphqlClient = getGraphqlClient() || createGraphqlClient(graphqlClientConfig);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _graphqlClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _graphqlClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _graphqlClient;

  return _graphqlClient;
}

export function useInitGraphqlClient(graphqlClientConfig: IGraphqlClientConfig): IGraphqlClient {
  const store = useMemo(
    () => initializeGraphqlClient(graphqlClientConfig),
    graphqlClientConfig.initialState ? [graphqlClientConfig.initialState] : []
  );
  return store;
}

export function useGraphqlClient(): IGraphqlClient {
  return useApolloClient() as IGraphqlClient;
}

export function GraphqlProvider({
  children,
  ...graphqlClientConfig
}: PropsWithChildren<IGraphqlClientConfig>): ReactElement {
  const graphqlClient = useInitGraphqlClient(graphqlClientConfig);
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
}

export function stringToGQL(query: string): DocumentNode {
  return gql`
    ${query}
  `;
}

export function extractGqlData<Data>(result: IData): Data | undefined {
  const data =
    result && "object" === typeof result
      ? result[Object.keys(result)[0] as keyof typeof result]
      : result;
  return data as Data | undefined;
}
