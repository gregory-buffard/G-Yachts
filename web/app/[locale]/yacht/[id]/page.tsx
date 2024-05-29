import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchYacht } from "@/actions/yachts";
import { YachtProvider } from "@/context/yacht";
import Hero from "@/components/yacht/hero";
import Details from "@/components/yacht/details/details";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Yacht = async ({ params }: { params: { id: string } }) => {
  return (
    <YachtProvider yacht={await fetchYacht(params.id)}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Newsletter />
        <Footer />
      </main>
    </YachtProvider>
  );
};

export default Yacht;