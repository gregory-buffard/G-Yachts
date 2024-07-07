import { fetchFeaturedSales } from "@/actions/yachts";
import Section from "@/components/index/featured/components";

const Featured = async () => (
  <Section carouselData={await fetchFeaturedSales()} />
);

export default Featured;
