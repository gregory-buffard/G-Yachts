import { EventProvider } from "@/context/event";
import { fetchEvent } from "@/actions/event";
import { getLocale } from "next-intl/server";
import Bar from "@/components/nav/bar";
import Hero from "@/components/events/event/hero";
import Detail from "@/components/events/event/detail";
import dynamic from "next/dynamic";
import { fetchFeatured } from "@/actions/charter";

const View = dynamic(() => import("@/components/view")),
  Charter = dynamic(() => import("@/components/events/event/charter")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

const Event = async ({ params }: { params: { id: string } }) => (
  <main className={"w-full flex flex-col justify-start items-center"}>
    <Bar dynamicColor={100} />
    <View />
    <EventProvider
      event={await fetchEvent((await getLocale()) as "en" | "fr", params.id)}
    >
      <Hero />
      <Detail />
    </EventProvider>
    <Charter carouselData={await fetchFeatured()} />
    {/* TODO: Use different action for fetching charters depending on yacht's location. */}
    <Newsletter />
    <Footer />
  </main>
);

export default Event;
