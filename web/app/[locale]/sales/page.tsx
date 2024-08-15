import Hero from "@/components/sales/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchFeaturedSales, fetchSales } from "@/actions/yachts";
import { getLocale, getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/sales/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

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
          ? `https://g-yachts.com/${locale}/sales`
          : `https://g-yachts.com/${locale}/ventes`,
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

const Sales = async () => {
  const locale = (await getLocale()) as "en" | "fr";
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeaturedSales(locale)} />
      <Listing data={await fetchSales(locale)} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Sales;
