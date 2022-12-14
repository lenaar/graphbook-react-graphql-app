import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const AuthLink = (operation, next) => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    operation.setContext((context) => ({
      ...context,
      headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`,
      },
    }));
  }
  return next(operation);
};

const client = new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          if (extensions.code === "UNAUTHENTICATED") {
            localStorage.removeItem("jwt-token");
            client.clearStore();
          }
          console.log(`[GraphQL error]: Message:
          ${message}, Location:
        ${locations}, Path: ${path}`);
        });
        if (networkError) {
          console.log(`[Network error]:
            ${networkError}`);
        }
      }
    }),
    AuthLink,
    createUploadLink({
      uri: "http://localhost:8000/graphql",
      credentials: "same-origin",
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
