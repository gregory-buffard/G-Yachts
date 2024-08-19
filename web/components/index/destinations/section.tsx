import { fetchDestinations } from "@/actions/destinations";
import Section from "@/components/index/destinations/components";
import { getLocale } from "next-intl/server";

const Destinations = async () => (
  <Section
    carouselData={await fetchDestinations((await getLocale()) as "en" | "fr")}
  />
);

export default Destinations;
