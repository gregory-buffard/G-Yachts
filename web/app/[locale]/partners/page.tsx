import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/partners/hero";
import Listing from "@/components/partners/listing";
import { fetchPartners } from "@/actions/partners";
import { getLocale } from "next-intl/server";
import { IPartner } from "@/types/partner";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Partners = async () => {
    const locale = await getLocale();
    const partners: IPartner[] = await fetchPartners(locale == "fr" ? "fr" : "en");
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
