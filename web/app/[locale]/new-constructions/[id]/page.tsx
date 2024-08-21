import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/yachts/yacht/hero";
import Details from "@/components/yachts/yacht/details";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchMetadata } from "@/actions/actions";
import { YachtProvider } from "@/context/yacht";
import {
  fetchNewConstruction,
  fetchSimilarNewConstructions,
} from "@/actions/yachts";

const View = dynamic(() => import("@/components/view")),
  Carousel = dynamic(() => import("@/components/yachts/carousel")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const id = params.id,
    locale = (await getLocale()) as "en" | "fr";

  return await fetchMetadata({ id, type: "new-construction", locale });
};

const NewConstructions = async ({ params }: { params: { id: string } }) => {
  const yacht = await fetchNewConstruction(params.id);

  return (
    <YachtProvider data={yacht} type={"new-construction"}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Carousel
          title={(await getTranslations("new-constructions")).rich("similar", {
            classic: (chunks) => (
              <span className={"font-classic uppercase"}>{chunks}</span>
            ),
          })}
          type={"new-constructions"}
          data={await fetchSimilarNewConstructions(yacht.length)}
        />
        <Newsletter />
        <Footer />
      </main>
    </YachtProvider>
  );
};

export default NewConstructions;
