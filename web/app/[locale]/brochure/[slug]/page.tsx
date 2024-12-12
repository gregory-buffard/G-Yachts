import { YachtProvider } from "@/context/yacht";
import {
  fetchCharter,
  fetchNewConstruction,
  fetchSale,
} from "@/actions/yachts";
import { getLocale } from "next-intl/server";
import {
  Hero,
  Details,
  About,
  KeyFeatures,
  Photo,
  Footer,
} from "@/components/yachts/yacht/brochure";
import { IContext } from "@/context/view";

const Brochure = async ({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams: {
    type: "sale" | "charter" | "new-construction";
    brochure: "hero" | "details" | "about" | "key-features" | "footer" | string;
    currency: IContext["currency"];
    length: IContext["units"]["length"];
    weight: IContext["units"]["weight"];
  };
}) => {
  const yacht = await (async () => {
      switch (searchParams.type) {
        case "sale":
          return await fetchSale(
            params.slug,
            (await getLocale()) as "en" | "fr",
          );
        case "charter":
          return await fetchCharter(
            params.slug,
            (await getLocale()) as "en" | "fr",
          );
        case "new-construction":
          return await fetchNewConstruction(
            params.slug,
            (await getLocale()) as "en" | "fr",
          );
      }
    })(),
    units: IContext["units"] = {
      length: searchParams.length,
      weight: searchParams.weight,
    };

  const renderComponent = () => {
    switch (searchParams.brochure) {
      case "hero":
        return <Hero units={units} />;
      case "details":
        return <Details currency={searchParams.currency} units={units} />;
      case "about":
        return <About />;
      case "key-features":
        return <KeyFeatures />;
      case "footer":
        return <Footer />;
      default:
        if (parseInt(searchParams.brochure) >= 0) {
          return (
            <Photo index={parseInt(searchParams.brochure)} units={units} />
          );
        }
        return null;
    }
  };

  return (
    <YachtProvider data={yacht} type={searchParams.type}>
      <main className="w-full flex flex-col justify-start items-center">
        {renderComponent()}
      </main>
    </YachtProvider>
  );
};

export default Brochure;
