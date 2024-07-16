import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/newConstruction/hero";
import Details from "@/components/newConstruction/details";
import { NewConstructionProvider } from "@/context/newConstruction";
import { fetchNewConstruction } from "@/actions/newConstructions";
const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Sale = async ({ params }: { params: { id: string } }) => {
  return (
    <NewConstructionProvider yacht={await fetchNewConstruction(params.id)}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Newsletter />
        <Footer />
      </main>
    </NewConstructionProvider>
  );
};

export default Sale;
