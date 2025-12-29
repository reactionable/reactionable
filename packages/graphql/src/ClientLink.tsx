import { ApolloLink } from "@apollo/client/index.js";
import { setContext as setApolloContext } from "@apollo/client/link/context/index.js";
import { createUploadLink } from "apollo-upload-client";
import type { ApolloClientOptions, HttpOptions } from "@apollo/client";
import type { ContextSetter } from "@apollo/client/link/context";
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
  const links: ApolloLink[] = [
    setApolloContext((_, prevContext) => {
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
    }),
    createUploadLink({
      uri,
      fetch,
      credentials: "include",
    }),
  ];
  if (link) {
    links.unshift(link);
  }

  return ApolloLink.from(links);
}
