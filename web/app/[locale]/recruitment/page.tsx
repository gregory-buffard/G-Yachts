import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/recruitment/hero";
import Join from "@/components/recruitment/join";
import { fetchRecruitments } from "@/actions/recruitment";
import {getLocale, getTranslations} from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Footer = dynamic(() => import("@/components/footer"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Listing = dynamic(() => import("@/components/recruitment/listing"));

export const generateMetadata = async ({
                                           params: { locale },
                                       }: {
    params: { locale: "en" | "fr" };
}) => {
    const t = await getTranslations({ locale, namespace: "recruitment.metadata" });
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
                    ? `https://g-yachts.com/${locale}/rectuitment`
                    : `https://g-yachts.com/${locale}/recrutement`,
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

const Recruitment = async () => (
  <main className="w-full flex flex-col justify-start items-center">
    <Bar dynamicColor={100} />
    <View />
    <Hero />
    <Join />
    <Listing
      data={await fetchRecruitments((await getLocale()) as "en" | "fr")}
    />
    <Newsletter />
    <Footer />
  </main>
);

export default Recruitment;
