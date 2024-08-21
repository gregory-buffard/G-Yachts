import dynamic from "next/dynamic";
import Bar from "@/components/nav/bar";
import Hero from "@/components/management/hero";
import { getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view")),
  Services = dynamic(() => import("@/components/management/services")),
  ServiceList = dynamic(() => import("@/components/management/serviceList")),
  Assets = dynamic(() => import("@/components/management/assets")),
  Accordion = dynamic(() => import("@/components/management/accordion")),
  Bottom = dynamic(() => import("@/components/management/bottom")),
  Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({ locale, namespace: "management.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: "G-Yachts",
    openGraph: {
      title: t("title"),
      siteName: "G-Yachts",
      url: `https://www.g-yachts.com/${locale}/management`,
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

const Management = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <Services />
      <ServiceList />
      <Assets />
      <Accordion />
      <Bottom />
      <Footer />
    </main>
  );
};

export default Management;
