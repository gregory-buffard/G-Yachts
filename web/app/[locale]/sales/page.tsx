import Hero from "@/components/yachts/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchFeaturedSales, fetchSales } from "@/actions/yachts";
import { getLocale } from "next-intl/server";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/yachts/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Sales = async () => {
  const locale = (await getLocale()) as "en" | "fr";
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeaturedSales(locale)} />
      <Listing data={await fetchSales(locale)} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Sales;
