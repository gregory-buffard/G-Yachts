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
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Yachts: {
          merge: true,
          fields: {
            keyFeatures: {
              merge(existing = [], incoming: any[], { readField }) {
                const merged: any[] = existing ? existing.slice(0) : [];
                const featureNameToIndex: Record<string, number> = {};

                // Populate merged array and map from existing features
                existing.forEach((feature, index) => {
                  const name = readField<string>("name", feature);
                  if (name) {
                    featureNameToIndex[name] = index;
                  }
                });

                // Merge or add incoming features
                incoming.forEach((feature) => {
                  const name = readField<string>("name", feature);
                  if (name) {
                    const index = featureNameToIndex[name];
                    if (typeof index === "number") {
                      // Merge existing and incoming feature data
                      merged[index] = {
                        ...merged[index],
                        ...feature,
                      };
                    } else {
                      // Add new feature
                      featureNameToIndex[name] = merged.length;
                      merged.push(feature);
                    }
                  }
                });

                return merged;
              },
            },
          },
        },
      },
    }),
    /*defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
    },*/
  });
});
