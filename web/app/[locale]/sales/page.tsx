import Hero from "@/components/sales/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchFeatured, fetchListing } from "@/actions/yachts";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/sales/listing"));

const Sales = async () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeatured()} />
      <Listing data={await fetchListing()} />
    </main>
  );
};

export default Sales;
