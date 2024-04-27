import { fetchFeatured } from "@/app/actions";
import Section from "@/components/index/featured/components";

const Featured = async () => <Section carouselData={await fetchFeatured()} />;

export default Featured;
