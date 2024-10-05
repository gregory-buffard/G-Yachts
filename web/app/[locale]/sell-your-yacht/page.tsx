import Hero from "@/components/sell-your-yacht/hero";
import Team from "@/components/sell-your-yacht/team";
import Solds from "@/components/sell-your-yacht/solds";
import { fetchBrokerinos } from "@/actions/brokers";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {fetchSolds} from "@/actions/solds";

const View = dynamic(() => import("@/components/view")),
    QualityBanner = dynamic(
        () => import("@/components/sell-your-yacht/qualityBanner"),
    ),
    CenturyBanner = dynamic(
        () => import("@/components/sell-your-yacht/centuryBanner"),
    ),
    Subtitle = dynamic(() => import("@/components/sell-your-yacht/subtitle")),
    Footer = dynamic(() => import("@/components/footer")),
    Newsletter = dynamic(() => import("@/components/newsletter"));

export const generateMetadata = async ({
                                         params: { locale },
                                       }: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({
    locale,
    namespace: "sell-your-yacht.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: "G-Yachts",
    openGraph: {
      title: t("title"),
      siteName: "G-Yachts",
      url: `https://www.g-yachts.com/${locale}/sell-your-yacht`,
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

const SellYourYacht = async () => {
  return (
      <main className={"w-full flex flex-col justify-start items-center"}>
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Subtitle />
        <QualityBanner />
        <CenturyBanner />
        <Solds data={await fetchSolds()} />
        <Team
            brokerinos={await fetchBrokerinos((await getLocale()) as "en" | "fr")}
        />
        <Newsletter />
        <Footer />
      </main>
  );
};

export default SellYourYacht;
