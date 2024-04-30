import { fetchDestinations } from "@/app/actions";
import Section from "@/components/index/destinations/components";

const Destinations = async () => (
  <Section carouselData={await fetchDestinations()} />
);

export default Destinations;
