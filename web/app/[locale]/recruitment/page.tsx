import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/recruitment/hero";
import Join from "@/components/recruitment/join";
import { fetchRecruitments } from "@/actions/recruitment";
import { getLocale } from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Footer = dynamic(() => import("@/components/footer"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Listing = dynamic(() => import("@/components/recruitment/listing"));

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
