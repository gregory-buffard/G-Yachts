import Hero from "@/components/events/hero";
import Bar from "@/components/nav/bar";
import Listing from "@/components/events/listing";
import dynamic from "next/dynamic";
import { fetchEvents } from "@/actions/events";
import { getLocale, getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({ locale, namespace: "events.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: "G-Yachts",
    openGraph: {
      title: t("title"),
      siteName: "G-Yachts",
      url:
        locale === "en"
          ? `https://www.g-yachts.com/${locale}/events`
          : `https://www.g-yachts.com/${locale}/evenements`,
      description: t("description"),
      type: "website",
      locale: locale === "en" ? "en_US" : "fr_FR",
      images: [
        {
          url: encodeURI("https://www.g-yachts.com/images/openGraph.png"),
          width: 1200,
          height: 630,
          alt: "G-Yachts logo",
        },
      ],
    },
  };
};
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
