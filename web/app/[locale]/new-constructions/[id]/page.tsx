import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/newConstruction/hero";
import Details from "@/components/newConstruction/details";
import { NewConstructionProvider } from "@/context/newConstruction";
import { fetchNewConstruction } from "@/actions/newConstructions";
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

  return await fetchMetadata({ id, type: "new-construction", locale });
};

const NewConstructions = async ({ params }: { params: { id: string } }) => {
  const yacht = await fetchNewConstruction(params.id);
  return (
    <NewConstructionProvider yacht={yacht}>
      <main className="w-full flex flex-col justify-start items-center">
        <Bar dynamicColor={100} />
        <View />
        <Hero />
        <Details />
        <Similar type="new-constructions" length={yacht.length} />
        <Newsletter />
        <Footer />
      </main>
    </NewConstructionProvider>
  );
};

export default NewConstructions;
