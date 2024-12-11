import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(
  ({ headers }: { headers: { [key: string]: string } }) => {
    const API_KEY = process.env.PAYLOAD_API_KEY;
    return {
      headers: {
        ...headers,
        Authorization: API_KEY && `users API-Key ${API_KEY}`,
      },
    };
  },
);

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: authLink.concat(
      new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_ADMIN_BASE_URI}/api/graphql`,
        fetchOptions: {
          cache: "no-cache",
        },
      }),
    ),
    cache: new InMemoryCache(),
  });
});
