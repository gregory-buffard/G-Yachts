import { fetchFeatured, convertCurrency } from "@/actions/yachts";
import Section from "@/components/sales/hero/components";

const Hero = async () => <Section data={await fetchFeatured()} />;

export default Hero;
