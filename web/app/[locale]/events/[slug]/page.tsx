import { EventProvider } from "@/context/event";
import { fetchEvent } from "@/actions/events";
import { getLocale, getTranslations } from "next-intl/server";
import Bar from "@/components/nav/bar";
import Hero from "@/components/events/event/hero";
import Detail from "@/components/events/event/detail";
import dynamic from "next/dynamic";
import { fetchChartersForDestination } from "@/actions/yachts";
import { Metadata } from "next";
import { fetchMetadata } from "@/actions/actions";

const View = dynamic(() => import("@/components/view")),
  Carousel = dynamic(() => import("@/components/yachts/carousel")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const slug = params.slug,
    locale = (await getLocale()) as "en" | "fr";

  return await fetchMetadata({ slug, type: "event", locale });
};

const Event = async ({ params }: { params: { slug: string } }) => {
  const event = await fetchEvent(
    (await getLocale()) as "en" | "fr",
    params.slug,
  );

  return (
    <main className={"w-full flex flex-col justify-start items-center"}>
      <Bar dynamicColor={100} />
      <View />
      <EventProvider event={event}>
        <Hero />
        <Detail />
      </EventProvider>
      <Carousel
        title={(await getTranslations("events")).rich("charters", {
          classic: (chunks) => (
            <span className={"font-classic uppercase"}>{chunks}</span>
          ),
        })}
        type={"charters"}
        data={await fetchChartersForDestination(event.location.destination)}
      />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Event;
