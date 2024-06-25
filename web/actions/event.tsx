"use server";

import IEvent from "@/types/event";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchEvents = async (locale: "en" | "fr"): Promise<IEvent[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Events($locale: LocaleInputType!) {
        Events(locale: $locale) {
          docs {
            id
            title
            fromDate
            toDate
            image {
              url
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });
  return data.Events.docs;
};

export const fetchEvent = async (
  locale: "en" | "fr",
  id: string,
): Promise<IEvent> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Event($locale: LocaleInputType!, $id: String!) {
        Event(id: $id, locale: $locale) {
          title
          fromDate
          toDate
          content
          image {
            url
          }
        }
      }
    `,
    variables: {
      locale,
      id,
    },
  });
  return data.Event;
};
