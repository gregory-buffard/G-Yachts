import Hero from "@/components/charters/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchFeatured, fetchListing } from "@/actions/charter";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/charters/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Charters = async () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeatured()} />
      <Listing data={await fetchListing()} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Charters;