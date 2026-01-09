import type { ApolloLink } from "@apollo/client/link";
import { ApolloLink as ApolloLinkImpl } from "@apollo/client/link";
import { setContext as setApolloContext } from "@apollo/client/link/context";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import fetch from "cross-fetch";

export type IGraphqlClientAuthorizationGetter = () => string;
export type IGraphqlClientLinkContextSetter = Parameters<typeof setApolloContext>[0];
export type IGraphqlClientUri = string;

export type IGraphqlClientLinkProps = {
  uri: IGraphqlClientUri;
  link?: ApolloLink;
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
    new UploadHttpLink({
      uri,
      fetch,
      credentials: "include",
    }),
  ];
  if (link) {
    links.unshift(link);
  }

  return ApolloLinkImpl.from(links);
}
