import Hero from "@/components/yachts/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchCharters, fetchFeaturedCharters } from "@/actions/yachts";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/yachts/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Charters = async () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeaturedCharters()} type={"charters"} />
      <Listing data={await fetchCharters()} type={"charters"} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Charters;
