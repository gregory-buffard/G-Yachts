import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_ADMIN_BASE_URI}/api/graphql`,
      fetchOptions: {
        cache: "no-cache",
      },
    }),
    cache: new InMemoryCache(),
  });
});
