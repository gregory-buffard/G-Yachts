import Hero from "@/components/charters/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";

import { fetchCharters, fetchFeaturedCharters } from "@/actions/yachts";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/charters/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Charters = async () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeaturedCharters()} />
      <Listing data={await fetchCharters()} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Charters;
