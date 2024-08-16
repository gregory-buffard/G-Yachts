import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { YachtProvider } from "@/context/yacht";
import Hero from "@/components/yachts/yacht/hero";
import Details from "@/components/yachts/yacht/details";
import { fetchCharter } from "@/actions/yachts";
import Similar from "@/components/similar/section";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { fetchMetadata } from "@/actions/actions";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const id = params.id,
    locale = (await getLocale()) as "en" | "fr";

  return await fetchMetadata({ id, type: "charter", locale });
};

const Charter = async ({ params }: { params: { id: string } }) => {
  const yacht = await fetchCharter(params.id);

  return (
    <YachtProvider data={yacht} type={"charter"}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Similar type="charters" length={yacht.length} />
        <Newsletter />
        <Footer />
      </main>
    </YachtProvider>
  );
};

export default Charter;
