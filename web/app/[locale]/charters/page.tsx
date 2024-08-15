import Hero from "@/components/charters/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchCharters, fetchFeaturedCharters } from "@/actions/yachts";
import { getLocale, getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/charters/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
                                           params: { locale },
                                       }: {
    params: { locale: "en" | "fr" };
}) => {
    const t = await getTranslations({ locale, namespace: "charters.metadata" });
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
                    ? `https://g-yachts.com/${locale}/charters`
                    : `https://g-yachts.com/${locale}/charters`,
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

const Charters = async () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeaturedCharters()} />
      <Listing data={await fetchCharters()} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Charters;
