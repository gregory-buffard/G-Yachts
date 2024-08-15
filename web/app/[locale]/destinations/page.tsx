import Hero from "@/components/destinations/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchDestinations } from "@/actions/destinations";
import { IDestination } from "@/types/destination";
import { getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Map = dynamic(() => import("@/components/destinations/map"), {
  ssr: false,
});
const Listing = dynamic(() => import("@/components/destinations/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({
    locale,
    namespace: "destinations.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: "G-Yachts",
    openGraph: {
      title: t("title"),
      siteName: "G-Yachts",
      url: `https://g-yachts.com/${locale}/destinations`,
      description: t("description"),
      type: "website",
      locale: locale === "en" ? "en_US" : "fr_FR",
      images: [
        {
          url: encodeURI("https://g-yachts.com/images/openGraph.png"),
          width: 1200,
          height: 630,
          alt: "G-Yachts logo",
        },
      ],
    },
  };
};

const Destinations = async () => {
  const destinations: IDestination[] = await fetchDestinations();
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <Map destinations={destinations} />
      <div className="flex flex-col w-full lg:w-5/6 px-10 -mt-[4vh] md:-mt-[6vh] lg:-mt-[12vh]">
        <Listing data={destinations} />
      </div>
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Destinations;
