import Hero from "@/components/events/hero";
import Bar from "@/components/nav/bar";
import Listing from "@/components/events/listing";
import dynamic from "next/dynamic";
import { fetchEvents } from "@/actions/event";
import { getLocale } from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Events = async () => {
  return (
    <main className={"w-full flex flex-col justify-start items-center"}>
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <Listing data={await fetchEvents((await getLocale()) as "en" | "fr")} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Events;
