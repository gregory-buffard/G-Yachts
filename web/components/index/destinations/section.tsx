import { fetchDestinations } from "@/actions/destinations";
import Section from "@/components/index/destinations/components";

const Destinations = async () => (
  <Section carouselData={await fetchDestinations()} />
);

export default Destinations;
