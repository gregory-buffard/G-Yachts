import Hero from "@/components/company/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchBrokerinos } from "@/actions/brokerino";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

const View = dynamic(() => import("@/components/view")),
  Story = dynamic(() => import("@/components/company/story")),
  Accordion = dynamic(() => import("@/components/company/accordion")),
  Team = dynamic(() => import("@/components/company/team")),
  Lifestyle = dynamic(() => import("@/components/company/lifestyle")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({ locale, namespace: "company.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: "G-Yachts",
    openGraph: {
      title: t("title"),
      siteName: "G-Yachts",
      url: `https://www.g-yachts.com/${locale}/company`,
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

const Company = async () => (
  <main className="w-full flex flex-col justify-start items-center">
    <Bar dynamicColor={-1} />
    <View />
    <Hero />
    <Story />
    <Accordion />
    <Team
      brokerinos={await fetchBrokerinos((await getLocale()) as "en" | "fr")}
    />
    <Lifestyle />
    <Footer />
  </main>
);

export default Company;
