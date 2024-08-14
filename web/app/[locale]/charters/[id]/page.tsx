import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { CharterProvider } from "@/context/charter";
import Hero from "@/components/charter/hero";
import Details from "@/components/charter/details/details";
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
  const charter = await fetchCharter(params.id);

  return (
    <CharterProvider charter={charter}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Similar type="charters" length={charter.length} />
        <Newsletter />
        <Footer />
      </main>
    </CharterProvider>
  );
};

export default Charter;
