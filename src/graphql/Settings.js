import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors }) => {
  graphqlErrors &&
    graphqlErrors.map(({ message }) => {
      return alert(`GraphQL error ${message}`);
    });
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://graphql-pokeapi.vercel.app/api/graphql" }),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
