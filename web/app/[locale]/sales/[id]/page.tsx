import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchSale } from "@/actions/yachts";
import { YachtProvider } from "@/context/yacht";
import Hero from "@/components/yacht/hero";
import Details from "@/components/yacht/details";
import Similar from "@/components/similar/section";
const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Sale = async ({ params }: { params: { id: string } }) => {
  const yacht = await fetchSale(params.id);
  return (
    <YachtProvider yacht={yacht}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Similar type="yachts" length={yacht.length} />
        <Newsletter />
        <Footer />
      </main>
    </YachtProvider>
  );
};

export default Sale;
