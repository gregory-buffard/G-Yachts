import Hero from "@/components/newContructions/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Shipyards from "@/components/newContructions/shipyards";
import { getTranslations } from "next-intl/server";
import { fetchNewConstructions, fetchShipyards } from "@/actions/yachts";

const View = dynamic(() => import("@/components/view")),
  Listing = dynamic(() => import("@/components/yachts/listing")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({
    locale,
    namespace: "new-constructions.metadata",
  });
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
          ? `https://www.g-yachts.com/${locale}/new-constructions`
          : `https://www.g-yachts.com/${locale}/nouvelles-constructions`,
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
const NewConstructions = async ({
  searchParams,
}: {
  searchParams: {
    builder?: string;
  };
}) => {
  let newConstructions = await fetchNewConstructions();
  if (searchParams.builder) {
    newConstructions = newConstructions.filter(
      (construction) => construction.builder === searchParams.builder,
    );
  }
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <div className="w-full md:px-40">
        <Shipyards data={await fetchShipyards()} />
      </div>
      <Listing data={newConstructions} type={"new-constructions"} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default NewConstructions;
