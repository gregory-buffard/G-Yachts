import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/partners/hero";
import Listing from "@/components/partners/listing";
import { fetchPartners } from "@/actions/partners";
import { getLocale, getTranslations } from "next-intl/server";
import { IPartner } from "@/types/partner";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({ locale, namespace: "partners.metadata" });
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
          ? `https://www.g-yachts.com/${locale}/partners`
          : `https://www.g-yachts.com/${locale}/partenaires`,
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

const Partners = async () => {
  const locale = await getLocale();
  const partners: IPartner[] = await fetchPartners(
    locale == "fr" ? "fr" : "en",
  );
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <div className="w-full md:px-40">
        <Listing data={partners} />
      </div>
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Partners;
