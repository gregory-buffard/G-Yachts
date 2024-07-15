import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/partners/hero";
import Detail from "@/components/partners/detail";
import { fetchPartner } from "@/actions/partners";
import { getLocale } from "next-intl/server";
import { IPartner } from "@/types/partner";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Partner = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const locale = await getLocale();
    const partner: IPartner = await fetchPartner(locale == "fr" ? "fr" : "en", params.id);
    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Bar dynamicColor={100} />
            <View />
            <Hero />
            <Detail data={partner} />
            <Newsletter />
            <Footer />
        </main>
    );
};

export default Partner;
