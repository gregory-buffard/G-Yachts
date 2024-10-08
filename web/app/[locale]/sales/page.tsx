import Hero from "@/components/yachts/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchFeaturedSales, fetchSales } from "@/actions/yachts";
import { getLocale, getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view")),
  Listing = dynamic(() => import("@/components/yachts/listing")),
  Newsletter = dynamic(() => import("@/components/newsletter")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({ locale, namespace: "sales.metadata" });
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
          ? `https://www.g-yachts.com/${locale}/sales`
          : `https://www.g-yachts.com/${locale}/ventes`,
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

const Sales = async () => {
  const locale = (await getLocale()) as "en" | "fr";
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeaturedSales(locale)} type={"sales"} />
      <Listing data={await fetchSales(locale)} type={"sales"} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Sales;
