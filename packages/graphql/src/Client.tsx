import {
  ApolloClient,
  ApolloLink,
  DocumentNode,
  InMemoryCache,
  InMemoryCacheConfig,
} from "@apollo/client";
import {
  ApolloProvider,
  HttpOptions,
  OperationVariables,
  gql,
  useApolloClient,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { IData as ICoreData } from "@reactionable/core";
import { createUploadLink } from "apollo-upload-client";
import fetch from "cross-fetch";
import { PropsWithChildren, ReactElement, useMemo } from "react";
export { gql } from "@apollo/client";

export type IGraphqlClient = ApolloClient<IGraphqlClientState>;
export type IGraphqlClientUri = HttpOptions["uri"];
export type IGraphqlClientState = Record<string, unknown>;
export type IVariables = OperationVariables;
export type IData = ICoreData;

let graphqlClient: IGraphqlClient | undefined;
function getGraphqlClient() {
  return graphqlClient;
}

function createGraphqlClient(uri: IGraphqlClientUri, cacheConfig?: InMemoryCacheConfig) {
  const httpLink: ApolloLink = createUploadLink({
    uri,
    fetch,
    credentials: "include", // Additional fetch() options like `credentials` or `headers`,
  });

  const authLink: ApolloLink = setContext((_, prevContext) => {
    const { headers } = prevContext;

    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(cacheConfig),
  });
}

export function initializeGraphqlClient(
  uri: IGraphqlClientUri,
  initialState: IGraphqlClientState,
  cacheConfig?: InMemoryCacheConfig
): IGraphqlClient {
  const _graphqlClient = getGraphqlClient() || createGraphqlClient(uri, cacheConfig);

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

export function useInitGraphqlClient(
  uri: IGraphqlClientUri,
  initialState: IGraphqlClientState,
  cacheConfig?: InMemoryCacheConfig
): IGraphqlClient {
  const store = useMemo(() => initializeGraphqlClient(uri, initialState, cacheConfig), [
    initialState,
  ]);
  return store;
}

export function useGraphqlClient(): IGraphqlClient {
  return useApolloClient() as IGraphqlClient;
}

export type IApolloProviderProps = {
  uri: IGraphqlClientUri;
  initialState: IGraphqlClientState;
  cacheConfig?: InMemoryCacheConfig;
};

export function GraphqlProvider({
  uri,
  initialState,
  cacheConfig,
  children,
}: PropsWithChildren<IApolloProviderProps>): ReactElement {
  const graphqlClient = useInitGraphqlClient(uri, initialState, cacheConfig);
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
}

export function stringToGQL(query: string): DocumentNode {
  return gql`
    ${query}
  `;
}

export function extractGqlData<Data>(result: IData): Data | undefined {
  const data = result && "object" === typeof result ? result[Object.keys(result)[0]] : result;
  return data as Data | undefined;
}
