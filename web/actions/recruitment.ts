"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchRecruitments = async (locale: "en" | "fr") => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Recruitments($locale: LocaleInputType!) {
        Recruitments(locale: $locale, fallbackLocale: en) {
          docs {
            title
            description
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });
  return data.Recruitments.docs;
};
