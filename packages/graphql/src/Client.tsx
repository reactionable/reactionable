import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider,
  HttpOptions,
  OperationVariables,
  createHttpLink,
  gql,
  useApolloClient,
} from '@apollo/react-hooks';
import React, { PropsWithChildren, useMemo } from 'react';

export { gql } from '@apollo/react-hooks';

export type IGraphqlClient = ApolloClient<any>;
export type IGraphqlClientUri = HttpOptions['uri'];
export type IGraphqlClientState = any | undefined;
export type IOperationVariables = OperationVariables;

let graphqlClient: IGraphqlClient | undefined;
function getGraphqlClient() {
  return graphqlClient;
}

function createGraphqlClient(uri: IGraphqlClientUri) {
  const httpLink = createHttpLink({
    uri,
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`,
  });

  const authLink = setContext((_, prevContext) => {
    console.log({ prevContext });

    const { headers } = prevContext;

    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeGraphqlClient(uri: IGraphqlClientUri, initialState: IGraphqlClientState) {
  const _graphqlClient = getGraphqlClient() || createGraphqlClient(uri);

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
  if (typeof window === 'undefined') return _graphqlClient;

  return _graphqlClient;
}

export function useInitGraphqlClient(uri: IGraphqlClientUri, initialState: IGraphqlClientState) {
  const store = useMemo(() => initializeGraphqlClient(uri, initialState), [initialState]);
  return store;
}

export function useGraphqlClient() {
  return useApolloClient();
}

export type IApolloProviderProps = {
  uri: IGraphqlClientUri;
  initialState: IGraphqlClientState;
};

export function GraphqlProvider({
  uri,
  initialState,
  children,
}: PropsWithChildren<IApolloProviderProps>) {
  const graphqlClient = useInitGraphqlClient(uri, initialState);
  return <ApolloProvider client={graphqlClient} children={children} />;
}

export function stringToGQL(query: string) {
  return gql`
    ${query}
  `;
}

export function extractGqlData<Data>(result: any): Data | undefined {
  const data = result[Object.keys(result)[0]];
  return data as Data | undefined;
}
