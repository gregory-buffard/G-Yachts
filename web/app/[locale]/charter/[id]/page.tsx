import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchCharter } from "@/actions/charter";
import { CharterProvider } from "@/context/charter";
import Hero from "@/components/charter/hero";
import Details from "@/components/charter/details/details";
import Brokerino from "@/components/yacht/brokerino";
import { fetchBrokerino } from "@/actions/brokerino";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Charter = async ({ params }: { params: { id: string } }) => {
  const yacht = await fetchCharter(params.id);

  return (
    <CharterProvider charter={yacht}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        {yacht && (
          <Details>
            <Brokerino brokerino={await fetchBrokerino(yacht.brokerEmail)} />
          </Details>
        )}
        <Newsletter />
        <Footer />
      </main>
    </CharterProvider>
  );
};

export default Charter;
