"use server";

import IEvent from "@/types/event";
import { getClient } from "@/apollo";
import { gql } from "@apollo/client";

export const fetchEvents = async (locale: "en" | "fr"): Promise<IEvent[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Events($locale: LocaleInputType!) {
        Events(locale: $locale, limit: 0) {
          docs {
            id
            title
            fromDate
            toDate
            image {
              alt
              sizes {
                thumbnail {
                  url
                  width
                  height
                }
                fhd {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });
  return [...data.Events.docs].sort(
    (a: IEvent, b: IEvent) =>
      new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime(),
  );
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
          content
          fromDate
          toDate
          location {
            city
            country
            destination {
              country
              continent
            }
          }
          image {
            alt
            sizes {
              thumbnail {
                url
                width
                height
              }
              fhd {
                url
                width
                height
              }
            }
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
