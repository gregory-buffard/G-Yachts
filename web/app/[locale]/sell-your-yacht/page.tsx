import Hero from "@/components/sell-your-yacht/hero";
import Bar from "@/components/nav/bar";
import QualityBanner from "@/components/sellYourYacht/qualityBanner";
import CenturyBanner from "@/components/sellYourYacht/centuryBanner";
import dynamic from "next/dynamic";
import React from "react";
import { getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view")),
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
      <QualityBanner />
      <CenturyBanner />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default SellYourYacht;
