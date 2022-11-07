import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(() =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }),
    new HttpLink({ uri: "http://localhost:8000/graphql" }),
  ]),
  cache: new InMemoryCache(),
});

export default client;