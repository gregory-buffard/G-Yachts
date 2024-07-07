import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { CharterProvider } from "@/context/charter";
import Hero from "@/components/charter/hero";
import Details from "@/components/charter/details/details";
import { ICharter } from "@/types/charter";
import { fetchCharter } from "@/actions/yachts";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Charter = async ({ params }: { params: { id: string } }) => {
  const yacht: ICharter = await fetchCharter(params.id);

  return (
    <CharterProvider charter={yacht}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Newsletter />
        <Footer />
      </main>
    </CharterProvider>
  );
};

export default Charter;
