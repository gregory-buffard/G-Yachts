import dynamic from "next/dynamic";
import Bar from "@/components/nav/bar";
import Hero from "@/components/destination/hero";
import { DestinationProvider } from "@/context/destination";
import { fetchDestination } from "@/actions/destinations";
import Details from "@/components/destination/details";
import { IDestination } from "@/types/destination";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchMetadata } from "@/actions/actions";
import { fetchChartersForDestination } from "@/actions/yachts";

const View = dynamic(() => import("@/components/view")),
  Carousel = dynamic(() => import("@/components/yachts/carousel")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params,
}: {
  params: { id: string; locale: "en" | "fr" };
}): Promise<Metadata> => {
  const id = params.id;

  return await fetchMetadata({
    id,
    type: "destination",
    locale: params.locale,
  });
};

const Destinations = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const destination: IDestination = await fetchDestination(
    params.id,
    (await getLocale()) as "en" | "fr",
  );
  return (
    <DestinationProvider destination={destination}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Carousel
          title={(await getTranslations("destination")).rich("charters", {
            classic: (chunks) => (
              <span className={"font-classic uppercase"}>{chunks}</span>
            ),
            destination: destination.destination,
          })}
          type={"charters"}
          data={await fetchChartersForDestination(destination)}
        />
        <Newsletter />
        <Footer />
      </main>
    </DestinationProvider>
  );
};

export default Destinations;
