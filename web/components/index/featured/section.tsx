import { fetchFeatured } from "@/actions/yachts";
import Section from "@/components/index/featured/components";

const Featured = async () => <Section carouselData={await fetchFeatured()} />;

export default Featured;
