import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { YachtProvider } from "@/context/yacht";
import Hero from "@/components/yachts/yacht/hero";
import Details from "@/components/yachts/yacht/details";
import { fetchCharter, fetchSimilarCharters } from "@/actions/yachts";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
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

  return await fetchMetadata({ slug, type: "charter", locale });
};

const Charter = async ({ params }: { params: { slug: string } }) => {
  const yacht = await fetchCharter(
    params.slug,
    (await getLocale()) as "en" | "fr",
  );

  return (
    <YachtProvider data={yacht} type={"charter"}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Carousel
          type={"charters"}
          data={
            yacht.similar && yacht.similar.length >= 4
              ? yacht.similar
              : await fetchSimilarCharters(yacht.length)
          }
          title={(await getTranslations("charters")).rich("similar", {
            classic: (chunks: React.ReactNode) => (
              <span className={"font-classic uppercase"}>{chunks}</span>
            ),
          })}
        />
        <Newsletter />
        <Footer />
      </main>
    </YachtProvider>
  );
};

export default Charter;
