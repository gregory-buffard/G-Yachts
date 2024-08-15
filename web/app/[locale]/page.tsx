import Bar from "@/components/nav/bar";
import Hero from "@/components/index/hero";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Services = dynamic(() => import("@/components/index/services"));
const WorkingTogether = dynamic(() => import("@/components/index/working"));
const Featured = dynamic(() => import("@/components/index/featured/section"));
const Memories = dynamic(() => import("@/components/index/memories"));
const Destinations = dynamic(
  () => import("@/components/index/destinations/section"),
);
const Learn = dynamic(() => import("@/components/index/learn"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({ locale, namespace: "index.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: "G-Yachts",
    openGraph: {
      title: t("title"),
      siteName: "G-Yachts",
      url: `https://g-yachts.com/${locale}`,
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

const Home = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <Learn />
      <Services />
      <WorkingTogether />
      <Featured />
      <Memories />
      <Destinations />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Home;
