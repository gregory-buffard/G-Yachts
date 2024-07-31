import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { CharterProvider } from "@/context/charter";
import Hero from "@/components/charter/hero";
import Details from "@/components/charter/details/details";
import { fetchCharter } from "@/actions/yachts";
import Similar from "@/components/similar/section";
import Reservations from "@/components/charter/reservations";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Charter = async ({ params }: { params: { id: string } }) => {
  const charter = await fetchCharter(params.id);
  return (
    <CharterProvider charter={charter}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Reservations data={charter.reservations} />
        <Similar type="charters" length={charter.length} />
        <Newsletter />
        <Footer />
      </main>
    </CharterProvider>
  );
};

export default Charter;
