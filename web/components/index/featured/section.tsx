import { fetchFeaturedSales } from "@/actions/yachts";
import Section from "@/components/index/featured/components";
import { getLocale } from "next-intl/server";

const Featured = async () => (
  <Section
    carouselData={await fetchFeaturedSales((await getLocale()) as "en" | "fr")}
  />
);

export default Featured;
