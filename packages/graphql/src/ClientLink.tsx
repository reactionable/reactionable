import { HttpOptions, ApolloLink, ApolloClientOptions } from "@apollo/client";
import { setContext as setApolloContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { ContextSetter } from "@apollo/client/link/context";
import fetch from "cross-fetch";

export type IGraphqlClientUri = HttpOptions["uri"];
export type IGraphqlClientAuthorizationGetter = () => string;
export type IGraphqlClientLinkContextSetter = ContextSetter;

export type IGraphqlClientLinkProps = {
  uri: IGraphqlClientUri;
  link?: ApolloClientOptions<unknown>["link"];
  getAuthorization?: IGraphqlClientAuthorizationGetter;
  setContext?: IGraphqlClientLinkContextSetter;
};

export function getGraphqlClientLink({
  uri,
  getAuthorization,
  setContext,
  link,
}: IGraphqlClientLinkProps) {
  const httpLink: ApolloLink = createUploadLink({
    uri,
    fetch,
    credentials: "include",
  });

  const authLink: ApolloLink = setApolloContext((_, prevContext) => {
    if (getAuthorization) {
      prevContext = {
        ...prevContext,
        headers: {
          ...(prevContext?.headers || {}),
          Authorization: getAuthorization(),
        },
      };
    }

    return setContext ? setContext(_, prevContext) : prevContext;
  });

  const graphqlClientLink = authLink.concat(httpLink);
  if (link) {
    graphqlClientLink.concat(link);
  }

  return graphqlClientLink;
}
